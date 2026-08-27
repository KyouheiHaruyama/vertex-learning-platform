# 実装プロンプト: Vertex ホームページ

## 1. 目的

`design/vertex-home.png` を唯一の正として、Vertex のホームページ（`/`）を実装する。
既存のデザインシステム（`prompts/design-system.md` で実装済み）のトークンとコンポーネントを再利用し、リファレンスに存在してまだ無いものだけを新規に作る。

## 2. 読んだスキル / ドキュメント

- `AGENTS.md`（セクション 3 UI の作業 / 5 アプリの構造 / 6 技術スタック / 7 すでに決まっている事項 / 13 実行するチェック）
- `prompts/design-system.md` — 既存トークンとコンポーネントの API
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — フォントは `app/layout.tsx` で設定済み、追加作業なし
- Sanity 系スキルは今回の範囲外。今回も Sanity・Clerk・PostHog・MCP には一切触れない。

## 3. 確認した既存コード

- `app/globals.css` — Primary/Neutral トークン、`--color-canvas` `#faf6f4`、radius (xs/sm/md/lg/xl)、shadow (sm–xl)、`text-display-1` 〜 `text-small` と `text-eyebrow` のユーティリティ
- `app/layout.tsx` — Inter (400/500/600/700) と Playfair Display (700) を `--font-inter` / `--font-playfair` として読み込み済み。`body` に canvas 背景
- `app/page.tsx` — 現在は `/design-system` へのリンクだけのプレースホルダ。これを置き換える
- `components/ui/` — Button / SearchInput / Select / Badge / StatusIndicator / ProgressBar / Card / CourseCard / LessonVideoCard / LessonCard / ResourceCard / Navbar / Breadcrumbs / Pagination / Logo
- `components/icons/index.tsx` — outline/filled のアイコン集。`ArrowRightIcon` と `StarIcon` は未実装
- `lib/cn.ts` — クラス結合ヘルパー
- Sanity のクライアントもスキーマもまだ存在しない

## 4. リファレンスから読み取った仕様

画像（1024x1536）をピクセル計測して得た値。以下の px は画像上の実測値で、そのまま実装値として使う。

### ページフレーム
- 中央に幅 965px のコンテンツフレーム。左右の余白は 45 度の細い斜線ハッチ（非常に淡いウォームグレー、約 14px 間隔）で埋まる
- フレームとハッチの境界に縦のヘアライン（x=29 と x=994）
- フレーム内の左右パディング 約 54px → 内側のコンテンツ幅 856px
- 背景は canvas（ハッチ側もフレーム側も同じ地色）

### ヘッダー（高さ 97px、下端にヘアライン）
- 左: Vertex ロゴ（オレンジの V マーク + ワードマーク、ワードマーク約 19px 相当）
- 中: `Courses` `My Learning` — **どちらもアクティブではなく Neutral 900**、Body Large (16px)
- 右: bell アイコン（outline, 24px）+ 円形アバター（直径 40px）

### ヒーロー（ヘッダー下端 97 〜 区切り線 742）
- アイブロウのピル: 209x39、radius full、地はほぼ白の淡いウォーム、1px の淡いボーダー、テキスト `INTELLIGENT LEARNING` は Primary 500・11px・大文字・トラッキング広め。上マージン 70px
- H1: **Playfair Display Bold 64px / 行送り 74px**、2 行、中央揃え、Neutral 900
  `Search your learning` / `in plain English.`
  ピル下端から 39px
- リード文: **Inter Regular 20px / 行送り 32px**、2 行、中央揃え、Neutral 700
  `Vertex understands what you want to learn and` / `finds the exact lessons across all your courses.`
  H1 下端から 31px
- CTA ボタン: 226x60、radius 12px、Primary 500 の塗り、白文字 18px Medium、右に arrow-right アイコン（20px）、テキストとアイコンの間 24px。リード文から 41px
- 検索バー: 750x88、radius 16px、白地、1px の淡いボーダー、控えめな影。左に search アイコン（24px）、プレースホルダ `Ask anything about your learning...` は 20px・Neutral 500、右端に `⌘ K` のキーヒント（63x43、radius 8px、1px ボーダー）。CTA から 42px
- 検索バー下端から区切り線まで 53px

### All Courses セクション（区切り線 742 〜）
- 見出し行: 左に `All Courses`（**Playfair Display Bold 28px**）、右に `View all courses →`（Primary 500、Body Large 16px、arrow-right 16px）。セクション上端から 53px
- コースカード 3 列グリッド、カード幅 約 276px、gap 18px、カード高さは 3 枚とも同じ 373px。見出しから 33px
- カード内部（padding 28px、radius 16px、白地、1px 淡いボーダー、影 sm）:
  - ロゴタイル 76x76、radius 18px（カード上端から 32px）
  - タイトル **Playfair Display Bold 22px / 30px**、タイルから 28px
  - 説明文 Inter Regular 14px / 20px、Neutral 500、2〜3 行
  - 可変スペーサー
  - ヘアラインの区切り線
  - メタ行: bar-chart アイコン + レベル / clock + 再生時間 / **document** + モジュール数。すべて Small (12px)・Neutral 500
- カード内容:
  1. `Next.js for Production` / `Build scalable, high-performance web applications with Next.js.` / Intermediate · 18h 24m · 12 modules
  2. `Docker Essentials` / `Containerize applications and streamline your development workflow.` / Beginner · 10h 12m · 8 modules
  3. `TypeScript Deep Dive` / `Go beyond the basics and write safer, more expressive code.` / Intermediate · 14h 36m · 10 modules

### ノート帯（y=1301）
- 左右に伸びるヘアライン（テキストに向かってフェード）、中央に Primary 500 の outline star アイコン + `New courses and lessons added every week.`（Inter 16px・Neutral 700）
- カード下端から 74px

### 装飾バー（ページ最下部）
- 2 つのクラスタ（左 6 本 / 右 7 本）に分かれた縦棒。中央は空き
- 各棒は上下がフェードする縦グラデーション（Primary 300 相当のサーモン）、幅はまちまち、高さもまちまち
- 強くぼかされた柔らかい表現。ページ下端まで伸びる

## 5. 決定事項と前提

1. **コースカードのロゴタイルはレターマークで代替する。**（ユーザー判断）
   `N` は Neutral 900 の地に白、`D` と `TS` は青地に白。他社ロゴをリポジトリに含めない。カードは `mark` を `ReactNode` として受け取り、後で Sanity の実ロゴ画像に差し替えられるようにする。
2. **ヒーローの検索バーは見た目のみ。**（ユーザー判断）
   フォームの `action` は設定せず、送信もしない。`/search` を実装する際に GET フォームへ差し替える。
3. **データはページ内のローカル定数から描画する。** Sanity のクライアントもスキーマもまだ存在しないため。データの形は将来 Sanity から取得する course ドキュメント（title / summary / level / duration / moduleCount）に対応させ、差し替え点を 1 箇所にまとめる。
4. **既存の `CourseCard` は使わず、新しい `HomeCourseCard` を作る。** リファレンスのカードは既存コンポーネントと構造が違う（大きなロゴタイル、Playfair のタイトル、区切り線、下端固定のメタ行、固定高）。既存の `CourseCard` は検索結果など別の文脈で使うため壊さない。
5. **既存の `Navbar` を拡張する。** 右側スロット（bell + アバター）を受け取る任意の `actions` prop を追加する。既存の `/design-system` での使い方は変えない。
6. **アバターは Neutral のプレースホルダにする。** Clerk は未接続で、リファレンスの人物写真は使えない。user アイコンを入れた円形プレースホルダとし、Clerk 接続時に実画像へ差し替える。
7. **ハッチ模様は CSS の `repeating-linear-gradient` で描く。** 画像アセットを追加しない。フレームの外側全体を埋めるので、広い画面ではハッチが広くなる。
8. **リファレンスに無いタイポサイズを 2 つ globals.css に追加する**: `text-display-hero`（Playfair 700 / 64 / 72）と `text-lead`（Inter 400 / 20 / 32）。ヒーロー専用の拡張として、既存スケールと同じ場所で管理する。`All Courses` の 28px とカードタイトルの 22px は、Playfair を既存の Heading サイズに当てるだけなので新規トークンにしない。
9. **すべてサーバーコンポーネントで実装する。** 状態を持つ要素がない。`"use client"` は使わない。
10. **`/design-system` は変更しない。** 既存の描画が壊れていないことを確認する。

## 6. 変更・作成するファイル

作成:
- `components/ui/home-course-card.tsx` — ホーム用コースカード
- `components/ui/page-frame.tsx` — ハッチ余白付きの中央フレーム
- `app/_home/` は作らず、セクションは `app/page.tsx` 内のローカルコンポーネントにまとめる

変更:
- `app/page.tsx` — ホームページ本体（ヘッダー / ヒーロー / All Courses / ノート帯 / 装飾バー）
- `app/globals.css` — `text-display-hero` と `text-lead` を追加
- `components/icons/index.tsx` — `ArrowRightIcon` と `StarIcon` を追加
- `components/ui/navbar.tsx` — 任意の `actions` スロットを追加

触らない: `app/design-system/page.tsx` / `app/layout.tsx` / 既存の他コンポーネント / `package.json`（依存追加なし）/ `tsconfig.json` / `eslint.config.mjs`

## 7. 要件

- 上記セクション 4 の実測値をそのまま使う。近似で置き換えない。
- 色はトークン経由でのみ参照する。生の 16 進数をコンポーネントに書かない。ロゴタイルの青だけは例外とし、定数として 1 箇所にまとめる。
- 検索バーは既存の `SearchInput` を再利用し、サイズ差分（高さ 88px・radius 16px・テキスト 20px）を props か className で吸収する。デザインシステム側の既定値は変えない。
- CTA は既存の `Button` を使い、ヒーロー用のサイズ（高さ 60px・テキスト 18px）を `size` として追加するか className で上書きする。既存の md/lg は変えない。
- 装飾バーは `aria-hidden`。ハッチ余白も `aria-hidden`。
- ヘッダーは `<header>`、ナビは `<nav aria-label>`、各セクションは `<section>` に見出しを持たせる。
- bell とアバターにはアクセシブルな名前を付ける（`aria-label` または `sr-only`）。
- 全インタラクティブ要素にフォーカスリング（`focus-visible`、Primary 400 基調）。
- デスクトップの見た目を厳密に保ったまま、モバイル幅まで破綻させない。カードは 3 列 → 1 列、ヒーローの文字サイズは縮小、ハッチ余白は狭める。375px で横スクロールを出さない。

## 8. セキュリティ上の考慮

- プレゼンテーション層のみ。ネットワーク I/O、シークレット、環境変数、外部 API を扱わない。
- 外部リソースを読み込まない。画像アセットを追加しない（ハッチもバーも CSS で描く）。
- 依存パッケージを追加しない。
- ユーザー入力を扱わない（検索バーは見た目のみで送信しない）。`dangerouslySetInnerHTML` は使わない。

## 9. 受け入れ基準

1. `/` がリファレンスのヘッダー / ヒーロー / All Courses / ノート帯 / 装飾バーをすべて、記載どおりの値で表示する。
2. H1 が Playfair Display 64/72、リード文が Inter 20/32、カードタイトルが Playfair 22 で描画される。
3. コースカード 3 枚が同じ高さで並び、メタ行がカード下端に揃う。
4. ハッチ余白と中央フレームの境界にヘアラインが出る。
5. 既存コンポーネント（Button / SearchInput / Logo / Navbar / アイコン）を再利用しており、デザインシステムの既定値を壊していない。
6. 依存パッケージの追加がゼロ。
7. `"use client"` が 1 つも入らない。
8. `/design-system` が従来どおり表示される。
9. 型チェック・lint・ビルドがすべて通る。
10. 375px 幅で横スクロールが出ない。

## 10. 実行するチェック

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

ルート（`app/page.tsx`）とグローバル CSS が変わるため、`AGENTS.md` セクション 13 に従いビルドまで実行する。実際の出力を報告する。

## 11. 手動テスト手順

1. `npm run dev` を実行し、`http://localhost:3000/` を開く。
2. `design/vertex-home.png` を横に並べ、上から順に突き合わせる。特にヘッダーの高さとヘアライン、ピルの文言、H1 の 2 行の折り返し、CTA と検索バーのサイズ、カード 3 枚のメタ行、ノート帯の文言を確認する。
3. CTA と `View all courses` にマウスを乗せ、Primary 600 に変わることを確認する。
4. 検索バーをクリックし、ボーダーが `#FB923C` に変わることを確認する（送信はされない）。
5. Tab キーだけでヘッダー → CTA → 検索バー → View all courses まで到達でき、各要素にフォーカスリングが見えることを確認する。
6. DevTools のデバイスツールバーで幅 375px にし、カードが 1 列になり、横スクロールが出ないことを確認する。
7. `http://localhost:3000/design-system` を開き、従来どおり表示されることを確認する。
