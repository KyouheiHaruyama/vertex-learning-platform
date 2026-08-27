# 実装プロンプト: Sanity コンテンツモデル / Studio / サーバーサイド読み取り層

## 1. 目的

Vertex のコンテンツ基盤を作る。

1. リポジトリを `studio/` と `web/` の 2 ワークスペースに再編する（AGENTS.md セクション 5）
2. スタンドアロンの Sanity Studio を `studio/` に立て、course / module / lesson / instructor / category のスキーマを実装する（AGENTS.md セクション 8）
3. `web/` にサーバー専用の Sanity クライアント、GROQ クエリ、fetch ヘルパー、TypeGen による型を実装する

今回のスコープはここまで。ページの描画差し替え、コンテンツ投入、検索、進捗は含めない。

## 2. 読んだスキル / ドキュメント

- `AGENTS.md`（セクション 5 アプリの構造 / 6 技術スタック / 8 モデリングするデータ / 12 つまずきやすい点 / 13 実行するチェック）
- sanity-best-practices — `project-structure.md` / `nextjs.md` / `schema.md` / `groq.md` / `typegen.md`
  - Studio はスタンドアロンが推奨。埋め込みはビルドが遅く、Studio の自動アップデートと TypeGen watch が使えない
  - スキーマは `defineType` / `defineField` / `defineArrayMember` を必ず使う。見た目ではなく「それが何か」でモデリングする
  - `_id` は Sanity に生成させる。スラッグ由来の決定的 ID を作らない
  - リレーションは `reference` で持ち、GROQ で解決する
  - 動画は Sanity の `file` アセットに置かない。YouTube / Vimeo / Bunny の URL を持つ（AGENTS.md セクション 7 と一致）
  - GROQ は `defineQuery` で包む。TypeGen は `sanity.cli.ts` の `typegen` で設定し、`../web` を読んで `../web/sanity.types.ts` に出力する

## 3. 確認した既存コード / 環境

- ブランチ `feat/clerk-auth` は main（`84cc8f2`）にマージ済み。作業は更新後の main から切る
- **Sanity プロジェクトは作成済み**: 「Vertex」`projectId = 2opbcwou` / dataset = `production`。Sanity CLI はログイン済み
- **`npm create sanity` の Next.js 埋め込みフローが実行済み**で、以下が未コミットで存在する:
  - `app/studio/[[...tool]]/page.tsx`（埋め込み Studio）
  - `sanity/env.ts` `sanity/lib/client.ts` `sanity/lib/image.ts` `sanity/lib/live.ts` `sanity/schemaTypes/index.ts`（空）`sanity/structure.ts`
  - ルートの `sanity.config.ts` `sanity.cli.ts`
  - `package.json` に `sanity` `@sanity/vision` `@sanity/image-url` `next-sanity` `styled-components` が追加
- リポジトリ直下が Next.js アプリ本体（`app/` `components/` `lib/` `public/` と各設定ファイル）
- Clerk 済み: `proxy.ts`（`clerkMiddleware()` + `/__clerk/:path*`）、`app/layout.tsx` の `ClerkProvider`、`app/sign-in` `app/sign-up`
- `.env.local` は `.gitignore` の `.env*` で除外済み。`.env.example` はまだ無い
- Node v24.20.0 / npm 11.19.0（arm64）

## 4. 決定事項と前提

1. **`studio/` + `web/` の 2 ワークスペースに再編する。**（ユーザー判断）
   Next.js アプリ一式を `web/` へ移し、`studio/` を新設する。移動は `git mv` で行い履歴を保つ。
2. **生成済みの埋め込み Studio は削除する。** `app/studio/`、ルートの `sanity/` `sanity.config.ts` `sanity.cli.ts` を消し、Studio 用の依存（`sanity` `@sanity/vision` `styled-components`）を web の `package.json` から外す。web に残すのは `next-sanity` と `@sanity/image-url` のみ。
3. **`defineLive` / Live Content API は使わない。**
   `defineLive` は下書き取得のために `browserToken` をブラウザへ渡す。AGENTS.md セクション 12 の「read token はサーバーに保持し、クライアントへ決して公開しない」に反する。代わりに `import "server-only"` を付けたサーバー専用クライアントと、Next.js のキャッシュタグを使う自前の `sanityFetch` ヘルパーを実装する。Visual Editing も今回は入れない。
4. **dataset は private にする。** AGENTS.md セクション 12。`sanity dataset visibility set production private` を実行する。以降アプリからの読み取りには read token が必須になる。
5. **read token はユーザーが発行する。** CLI の `sanity tokens add` はトークンを標準出力に出すため、エージェントの実行ログに秘密情報が残る。Sanity Manage で Viewer 権限のトークンを発行し、`.env.local` の `SANITY_API_READ_TOKEN` に自分で貼ってもらう。
6. **今回作るスキーマは 5 つだけ。** course / module（オブジェクト）/ lesson / instructor / category。
   `video` ドキュメント（セクション 8・9）、agent context ドキュメント（セクション 10）、progress（アプリ状態）は、それぞれ取り込みパイプライン・検索・進捗機能と一緒に作るのでここには含めない。
7. **module は独立ドキュメントにしない。** AGENTS.md セクション 8 のとおり course に埋め込むオブジェクト型にする。`Module 5` `Lesson 5.1` のような番号は保存せず、配列の順序から導出する。
8. **lesson は親の course を持たない。** 必要なときは GROQ の逆参照（`*[_type == "course" && references(^._id)]`）で導出する。
9. **TypeGen は studio 側で設定し、web に出力する。** `studio/sanity.cli.ts` の `typegen` で `path: "../web/**/*.{ts,tsx}"`、`generates: "../web/sanity.types.ts"`。生成物 `web/sanity.types.ts` と `studio/schema.json` はコミットする（`git pull` 直後に型が揃い、CI で typegen を走らせなくて済む）。
10. **`.env.example` をコミットして正とする。**（AGENTS.md セクション 12）`NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `NEXT_PUBLIC_SANITY_API_VERSION` / `SANITY_API_READ_TOKEN` と、既存の Clerk の 2 つを列挙する。値は入れない。
11. **`projectId` と `dataset` をハードコードしない。**（AGENTS.md セクション 14）web も studio も env から読む。studio は Vite なので `SANITY_STUDIO_` プレフィックスの env を使う。
12. **ページの描画は今回変更しない。** `app/page.tsx` のコースデータはローカル定数のまま残す。データ層が揃ったことの確認は型チェックとクエリの手動実行で行う。

## 5. 変更・作成するファイル

### 移動（`git mv`）
`app/` `components/` `lib/` `public/` `proxy.ts` `next.config.ts` `postcss.config.mjs` `eslint.config.mjs` `tsconfig.json` `next-env.d.ts` `package.json` `package-lock.json` → `web/` 配下
`.env.local` も `web/` へ移す（git 管理外だが移動が必要）

### 削除
`app/studio/[[...tool]]/page.tsx` / ルートの `sanity/` 一式 / ルートの `sanity.config.ts` / ルートの `sanity.cli.ts`

### 新規作成 — studio/
- `studio/package.json` — `sanity` `@sanity/vision` `@sanity/icons` `react` `react-dom` `typescript`、scripts に `dev` `build` `deploy` `typegen`
- `studio/sanity.config.ts` — projectId / dataset を env から、`structureTool` + `visionTool`、schema を登録
- `studio/sanity.cli.ts` — api 設定と `typegen`（`../web` を読み `../web/sanity.types.ts` に出力）
- `studio/structure.ts` — Courses / Lessons / Instructors / Categories のデスク構成
- `studio/tsconfig.json` / `studio/.gitignore` / `studio/.env.example`
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/documents/course.ts` `lesson.ts` `instructor.ts` `category.ts`
- `studio/schemaTypes/objects/module.ts` `learning-outcome.ts` `resource.ts`

### 新規作成 — web/
- `web/sanity/env.ts` — projectId / dataset / apiVersion
- `web/sanity/client.ts` — `import "server-only"` 付きのサーバー専用クライアント（token / `useCdn: false` / `perspective: "published"`）
- `web/sanity/fetch.ts` — 型付き `sanityFetch`（Next.js の `revalidate` とタグ指定）
- `web/sanity/queries.ts` — `defineQuery` の GROQ 群
- `web/sanity/image.ts` — `@sanity/image-url` のビルダー
- `web/sanity.types.ts` — TypeGen 生成物

### 変更
- `.gitignore` — `node_modules` などのパターンをサブディレクトリに効く形へ（`/node_modules` → `node_modules/`）、`studio/dist` を追加
- `.claude/launch.json` — dev サーバーを `web/` で起動するように
- `.env.example` — 新規（リポジトリルート）
- `README.md` — 2 ワークスペースの起動手順

## 6. 実装するスキーマ（AGENTS.md セクション 8）

固定なのはリレーションと下記のフィールド。それ以外（title / description / validation / preview）は妥当に決める。

- **course**（document）: title, slug, summary, coverImage, level, price, popular（boolean・任意）, studentCount（表示用）, learningOutcomes[]（`learningOutcome` オブジェクト: icon, title, description）, instructor（`instructor` への reference）, category（`category` への reference）, modules[]（`module` オブジェクトの順序付き配列）
- **module**（object・course に埋め込み）: title, summary, lessons[]（`lesson` への reference の順序付き配列）
- **lesson**（document）: title, slug, videoUrl（url・YouTube / Vimeo / Bunny）, poster（image）, duration, freePreview（boolean）, studentCount, notes（Portable Text）, keyPoints[]（string）, proTip（任意）, resources[]（`resource` オブジェクト: type, title, description, url）
- **instructor**（document）: name, slug, photo, expertise, bio
- **category**（document）: title, slug, description

## 7. 実装する GROQ クエリ（`web/sanity/queries.ts`）

すべて `defineQuery` で包む。

- `COURSES_QUERY` — カタログ用の一覧。title / slug / summary / coverImage / level / price / popular / studentCount / instructor→name,slug / category→title,slug と、モジュール数とレッスン総数
- `COURSE_BY_SLUG_QUERY` — コース詳細。上記に加えて learningOutcomes、modules[]（title / summary / lessons[]→ title,slug,duration,freePreview）
- `LESSON_BY_SLUG_QUERY` — レッスン。全フィールドと、逆参照で導出した親 course（title / slug）およびモジュール位置
- `INSTRUCTOR_BY_SLUG_QUERY` — 講師と、その講師のコース一覧
- `CATEGORIES_QUERY` — カテゴリ一覧
- `COURSE_SLUGS_QUERY` / `LESSON_SLUGS_QUERY` — 静的生成用のスラッグ一覧

必要なフィールドだけを projection する。`*` で丸ごと返さない。Portable Text の `notes` は一覧系のクエリでは返さない。

## 8. 要件

- スキーマは `defineType` / `defineField` / `defineArrayMember` を必ず使う。ファイル名は kebab-case、named export。
- スラッグは `slug` 型に `source` と `maxLength` を設定し、`required()` を付ける。
- 各ドキュメントに `preview` を定義し、Studio 上で判別できるようにする。
- 参照は `reference` で持ち、`_id` は Sanity に生成させる。決定的 ID を作らない。
- `web/sanity/client.ts` は先頭に `import "server-only"` を置く。ブラウザから import されたらビルドが失敗する状態にする。
- read token / write token をクライアントに露出させない。`NEXT_PUBLIC_` が付くのは projectId / dataset / apiVersion だけ。
- 動画は URL フィールドとして持つ。Sanity の file アセットに動画を入れない。
- `sanityFetch` は Next.js のキャッシュタグを受け取り、後でオンデマンド再検証できる形にする。
- 生成された型を使い、クエリ結果に `any` を残さない。

## 9. セキュリティ上の考慮

- dataset を private にするため、read token 無しでは読めなくなる。トークンはサーバー専用の `SANITY_API_READ_TOKEN` にのみ置き、`import "server-only"` のクライアント内でだけ使う。
- `.env.local` は既に `.gitignore` で除外済み。移動後も除外され続けることを確認する。
- `.env.example` には値を入れない。変数名だけを列挙する。
- トークンの実値をターミナルに出力しない。発行はユーザーが Sanity Manage で行う。
- write token は今回作らない。書き込みが必要になるのは進捗保存で、そのときサーバールート内でのみ使う。
- Studio は Sanity 自身の認証で保護される。アプリ側の認証（Clerk）とは別系統として扱う。

## 10. 受け入れ基準

1. リポジトリが `studio/` と `web/` の 2 ワークスペースになっており、埋め込み Studio が残っていない。
2. `studio/` で `npm run dev` を実行すると Studio が起動し、Courses / Lessons / Instructors / Categories が表示される。
3. course のモジュール配列にモジュールを追加でき、その中でレッスンを参照できる。
4. `web/` に `sanity.types.ts` が生成され、クエリ結果の型が付いている。
5. `web/sanity/client.ts` がサーバー専用で、ブラウザバンドルに入らない。
6. `.env.example` がコミットされ、必要な変数がすべて列挙されている。
7. `web/` で型チェック・lint・ビルドが通り、既存の `/`・`/design-system`・`/sign-in`・`/sign-up` が従来どおり動く。
8. dataset が private になっている。

## 11. 実行するチェック

```bash
# web
cd web && npx tsc --noEmit && npm run lint && npm run build

# studio
cd studio && npx tsc --noEmit && npm run typegen
```

`AGENTS.md` セクション 13 に従い、ルート・設定・サーバーコードが変わるため web ではビルドまで実行する。Studio アプリのデプロイとスキーマのデプロイは、Context MCP を使う検索の作業に入るときに行う（今回は実行しない）。実際の出力を報告する。

## 12. 手動テスト手順

1. Sanity Manage（https://www.sanity.io/manage/project/2opbcwou）で Viewer 権限の API トークンを発行し、`web/.env.local` の `SANITY_API_READ_TOKEN` に貼る。
2. `cd studio && npm run dev` → http://localhost:3333 を開く。左に Courses / Lessons / Instructors / Categories が並ぶ。
3. Instructor を 1 件、Category を 1 件、Lesson を 2 件作って publish する。
4. Course を 1 件作り、instructor と category を参照させ、モジュールを 1 つ足してその中で 2 件のレッスンを参照し、publish する。
5. `cd web && npm run dev` → http://localhost:3000 が従来どおり表示される。`/design-system` と `/sign-in` も確認する。
6. `cd studio && npm run typegen` を実行し、`web/sanity.types.ts` に course / lesson などの型が出ることを確認する。
7. `cd web && npx tsc --noEmit` が通ることを確認する。
