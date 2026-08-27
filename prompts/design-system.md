# 実装プロンプト: Vertex Design System

## 1. 目的

`design/vertex-designsystem.png` を唯一の正として、Vertex のデザイン基盤（トークン、フォント、アイコン、コンポーネント）を実装する。
併せて、リファレンスシートを再現するショーケースページ `/design-system` を用意し、実装が仕様どおりであることを目視で検証できるようにする。

これは以降のすべての画面（カタログ、コース、レッスン、講師、My Learning、検索結果）が乗る土台であり、ここで作ったコンポーネントを各画面で再利用する。

## 2. 読んだスキル / ドキュメント

- `AGENTS.md`（セクション 3 UI の作業 / 5 アプリの構造 / 6 技術スタック / 13 実行するチェック / 14 迷ったら）
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — `next/font/google` の使い方。`variable` オプションで CSS 変数化し、`<html>` に付与する方式が現行 API であることを確認。
- Sanity 系スキル（sanity-best-practices ほか）は今回の範囲に無関係のため未使用。今回は Sanity・Clerk・PostHog・MCP に一切触れない。

## 3. 確認した既存コード

- `package.json` — Next.js 16.3.3 / React 19.2.8 / Tailwind CSS v4（`@tailwindcss/postcss`）。アイコンライブラリ・`clsx`・`tailwind-merge` などの依存は未導入。
- `app/globals.css` — `@import "tailwindcss"` と `@theme inline`、create-next-app 既定の `--background` / `--foreground` と `prefers-color-scheme: dark` ブロック。
- `app/layout.tsx` — Geist / Geist_Mono を `next/font/google` の `variable` 方式で読み込み。`LayoutProps<"/">` 型を使用（Next 16 の型付きルート）。
- `app/page.tsx` — create-next-app の既定ページ。`--font-geist-*` と `dark:` クラスに依存。
- `postcss.config.mjs` / `tsconfig.json`（`@/*` → `./*` のパスエイリアスあり）。
- `components/`・`lib/`・`prompts/` は未作成。再利用できる既存コンポーネントはゼロ。

## 4. リファレンスから読み取った仕様

画像を分割・拡大して読み取った内容。数値・16 進数はシート上に表記されたものを正とする（PNG が非可逆で色が数値どおりに再現されていないため、ピクセルのサンプル値は採用しない）。

### 01 COLORS
Primary: 500 `#F97316` / 400 `#FB923C` / 300 `#FDBA74` / 200 `#FED7AA` / 100 `#FFEEE5`
Neutral: 900 `#0F172A` / 700 `#334155` / 500 `#64748B` / 300 `#CBD5E1` / 200 `#E2E8F0` / 100 `#F1F5F9` / 50 `#FAFAFC` / White `#FFFFFF`

### 02 TYPOGRAPHY / 03 TYPE SCALE
2 書体: Playfair Display（Elegant・Readable・Timeless）、Inter（Clean・Modern・Highly legible）。

| Style | Font | Size / Line Height | Weight | Use |
|---|---|---|---|---|
| Display 1 | Playfair Display | 48 / 56 | Bold | Page titles |
| Display 2 | Playfair Display | 36 / 44 | Bold | Section titles |
| Heading 1 | Inter | 28 / 36 | Semi Bold | Card titles |
| Heading 2 | Inter | 22 / 30 | Semi Bold | Sub section |
| Heading 3 | Inter | 18 / 26 | Medium | Small titles |
| Body Large | Inter | 16 / 24 | Regular | Body copy |
| Body | Inter | 14 / 20 | Regular | Supporting text |
| Small | Inter | 12 / 16 | Regular | Captions, meta |

### 04 SPACING SYSTEM
Base unit 4px。スケール: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64（= 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 2.5 / 3 / 4 rem）。

### 05 RADIUS & SHADOWS
Radius: 4px (xs) / 8px (sm) / 12px (md) / 16px (lg) / 24px (xl) / Full (circle)
Shadows:
- Sm `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
- Md `0 4px 12px -2px rgba(15, 23, 42, 0.08)`
- Lg `0 12px 24px -4px rgba(15, 23, 42, 0.10)`
- Xl `0 20px 40px -8px rgba(15, 23, 42, 0.12)`

### 06 ICONS
Outline / Filled の 2 スタイル。並び順: bell, search, play-circle, document, bookmark, bar-chart, clock, user, chevron-right。
Icon Specs: 24x24px グリッド / 2px ストローク（outline）/ 角丸のラインキャップ / 一貫した光学バランス。

### 07 BUTTONS
4 バリアント × 3 状態（Default / Hover / Disabled）。
- Primary: 塗り（Primary 500）+ 白文字。ラベル "Get Started"。Hover でより濃いオレンジ。
- Secondary: 白背景 + Primary のボーダーと文字。ラベル "Explore Courses"。Hover で薄いオレンジの塗り。
- Tertiary: 白背景 + Neutral のボーダー、Neutral 900 の文字 + 外部リンクアイコン。ラベル "View Lesson"。Hover で影が強まる。
- Text: 背景・ボーダーなし、Primary の文字 + Primary の play-circle アイコン。ラベル "Watch Video"。
Button Specs: 高さ 44px（default）/ padding `0 16px` (lg)・`0 12px` (md) / radius 12px / Inter Medium 14–16px。
Disabled は全バリアントとも不透明度を落とした表現。

### 08 INPUTS
- Search / Text Input: 左に search アイコン、プレースホルダ "Search anything..."、右に `⌘ K` のキーヒント。
- Select: ラベル "Most Relevant"、右に chevron-down。
Field Specs: 高さ 44px / radius 12px / border `1px solid #E2E8F0` / padding `0 16px` / focus 時ボーダー色 `#FB923C`。

### 09 BADGES / TAGS
- `VIDEO`: 淡いオレンジ地 + オレンジ文字
- `LESSON`: 淡いインディゴ地 + インディゴ文字
- `POPULAR`: 淡いオレンジ地 + オレンジ文字
いずれも大文字・字間広め・小さめ（Small 相当）・角丸小。

### 10 STATUS / INDICATORS
`In Progress`（オレンジの部分リング）/ `Completed`（緑の丸+チェック）/ `Now Playing`（オレンジ塗りの play）/ `Locked`（Neutral の鍵）。

### 11 PROGRESS BAR
角丸フルのトラック + オレンジの塗り。右に `35% complete`（数値は強調、`complete` は淡色）。

### 12 CARDS
- Course Card: 角丸のロゴタイル（黒地に "N"）+ タイトル(H相当) + 説明 + メタ行（bar-chart「Intermediate」/ clock「18h 24m」/ folder「12 modules」）
- Lesson Card (Video): `VIDEO` バッジ + タイトル + 説明 + フッター（`Lesson 5.1 · 12:45` と、右に play-circle 付きの「Watch from 12:45」オレンジリンク）
- Lesson Card (Lesson): `LESSON` バッジ + タイトル + 説明 + フッター（`Module 5` と、右に外部リンクアイコン付きの「View lesson」オレンジリンク）
- Resource Card: document アイコン + タイトル + 説明 + フッター（`PDF · 1.2 MB` と、右にオレンジの外部リンクアイコン）
いずれも白系の面 + 1px の淡いボーダー + radius lg + 影 Sm 程度。

### 13 NAVIGATION
- Navbar: Vertex ロゴ（オレンジの V マーク + Neutral 900 のワードマーク）+ ナビ（`Courses` = アクティブでオレンジ、`My Learning` = Neutral）
- Breadcrumbs: `All Courses > Next.js for Production > Data Fetching & Caching`、区切りは chevron-right、最後の項目がカレント
- Pagination: `< 1 2 3 … 8 >`、カレント（1）はオレンジのボーダー + オレンジ文字の角丸ボックス

### 14 PRINCIPLES
アイコン + タイトル + 説明の 4 項目:
- Clarity First — Every element should communicate clearly.
- Consistency — Use components and patterns consistently across the platform.
- Focus & Calm — Remove noise and help learners focus on what matters.
- Accessible — Design with accessibility and inclusivity in mind.

### シート全体
左上にロゴ + Display の "Design System" + 説明文 + `VERSION 1.0 · MAY 2025`。
各セクションは番号（オレンジ）+ 大文字トラッキングのラベル。全体は角丸のパネルをグリッドに並べたレイアウト。背景はごく淡いウォームオフホワイト。

## 5. 決定事項と前提

1. **アイコンは自前の SVG コンポーネントで実装し、外部ライブラリを追加しない。**
   理由: `AGENTS.md` セクション 6 の技術スタックにアイコンライブラリの記載がない / シートは outline と filled の両方を要求しており、一般的なアイコンライブラリ（outline のみ）ではどのみち filled を自作することになる / 依存を増やさない方が「小さく保つ」方針に合う。24x24 の `viewBox`、`stroke-width: 2`、`stroke-linecap: round`、`currentColor` で統一する。
2. **クラス結合ヘルパーは `lib/cn.ts` に自前実装する**（`clsx` / `tailwind-merge` を追加しない）。バリアント間でクラスが衝突しない設計にすることで、マージ解決は不要。
3. **ダークモードは実装しない。** デザインシステムはライトのパレットのみを定義しており、ダークの規定が存在しない。`app/globals.css` の `prefers-color-scheme: dark` ブロックは削除する。
4. **Primary 600 `#EA580C` をホバー用として追加する。** シートに Primary 500 より濃いホバー色が描かれているが、値の表記がない。Tailwind の orange-600 に相当し、Primary 500 = `#F97316`（orange-500）と同系列で整合する。導出値である旨を「Needs your attention」で明示する。
5. **シート地の淡いウォームオフホワイトを `--color-canvas` として追加する。** パレット表には該当色がないが、シート背景として明確に存在する。リファレンスから読み取った `#FAF6F4` を採用する。これも導出値として明示する。
6. **`LESSON` バッジのインディゴと `Completed` の緑をアクセント色として追加する。** パレット表には無いがシートに存在する。`--color-accent-indigo: #4F46E5` / `--color-accent-indigo-bg: #EEF2FF` / `--color-success: #16A34A` とする。導出値として明示する。
7. **フォントは `next/font/google` でセルフホストする。** Playfair Display（700）と Inter（400/500/600/700）。CSS 変数 `--font-playfair` / `--font-inter` に割り当て、Tailwind の `--font-display` / `--font-sans` に接続する。Geist / Geist_Mono は使わなくなるため削除する。
8. **`app/page.tsx` は最小のプレースホルダに差し替える。** 既定ページが `--font-geist-*` と `dark:` に依存しており、7・3 の変更で破綻するため。`/design-system` への導線だけを置く。
9. **Tailwind の `neutral` 名前空間は一度クリアしてから再定義する**（`--color-neutral-*: initial;`）。部分的な上書きだと未定義の `neutral-400` などが Tailwind 既定値のまま残り、デザインシステム外の色が使えてしまうため。オレンジ側は `primary-*` という新しい名前空間なので衝突しない。
10. **Tailwind v4 の既定スペーシングは 4px 基準**（`--spacing: 0.25rem`）で、シートの Base unit 4px と一致する。よってスペーシングは独自定義せず既定スケールを使う（4=`1`, 8=`2`, 12=`3`, 16=`4`, 24=`6`, 32=`8`, 40=`10`, 48=`12`, 64=`16`）。
11. **タイプスケールは `@utility` でユーティリティ化する**（`text-display-1` … `text-small`）。各画面で毎回 `text-[28px] leading-9 font-semibold` を書かずに済み、スケールから外れた指定が起きにくい。
12. **すべてサーバーコンポーネントで実装する。** インタラクションは CSS の `hover:` / `focus:` で表現でき、状態を持つ必要がない。`"use client"` は使わない。
13. **ショーケースページはリファレンスの 14 セクションをすべて再現する。** レスポンシブ対応として、デスクトップのレイアウトは厳密に保ちつつ、狭い画面ではグリッドを 1 カラムに落とす（`AGENTS.md` セクション 3）。

## 6. 変更・作成するファイル

作成:
- `lib/cn.ts` — クラス結合ヘルパー
- `components/icons/index.tsx` — 24x24 のアイコン集（outline / filled）
- `components/ui/logo.tsx` — Vertex の V マーク + ワードマーク
- `components/ui/button.tsx` — `variant`: primary / secondary / tertiary / text、`size`: md / lg
- `components/ui/input.tsx` — `SearchInput` と `Select`
- `components/ui/badge.tsx` — `tone`: video / lesson / popular
- `components/ui/status-indicator.tsx` — in-progress / completed / now-playing / locked
- `components/ui/progress-bar.tsx`
- `components/ui/card.tsx` — カードの外枠プリミティブ
- `components/ui/course-card.tsx`
- `components/ui/lesson-video-card.tsx`
- `components/ui/lesson-card.tsx`
- `components/ui/resource-card.tsx`
- `components/ui/navbar.tsx`
- `components/ui/breadcrumbs.tsx`
- `components/ui/pagination.tsx`
- `app/design-system/page.tsx` — ショーケース

変更:
- `app/globals.css` — トークン定義（`@theme`）、ベーススタイル、タイプスケールのユーティリティ、ダークモードブロック削除
- `app/layout.tsx` — Playfair Display + Inter、metadata を Vertex のものに、body に canvas 背景
- `app/page.tsx` — 最小のプレースホルダに差し替え

触らない: `next.config.ts` / `postcss.config.mjs` / `tsconfig.json` / `package.json`（依存追加なし）/ `AGENTS.md` / `agent/` / `design/`

## 7. 要件

- リファレンスシートに書かれた数値（サイズ、行送り、ウェイト、radius、影、高さ、padding、border）をそのまま実装する。近似で置き換えない。
- 色はトークン経由でのみ参照する。コンポーネント内に生の 16 進数を書かない。
- コンポーネントは props でバリアントと状態を受け取り、ハードコードした文言を持たない（ショーケース上の "Get Started" などはページ側から渡す）。
- 各コンポーネントはネイティブ要素の props を継承する（`ButtonHTMLAttributes` など）ので、後続の画面で `onClick` や `href` を素直に付けられる。
- `disabled` は視覚表現だけでなく実際に `disabled` 属性 / `aria-disabled` として反映する。
- アイコンはすべて `currentColor` を使い、色は親から継承する。`aria-hidden` を付け、意味を持つ場合は隣接テキストか `aria-label` で補う。
- Breadcrumbs は `<nav aria-label>` + `<ol>`、カレント項目に `aria-current="page"`。Pagination も同様に `<nav>` + `<ol>`、カレントに `aria-current="page"`。
- Progress Bar は `role="progressbar"` と `aria-valuenow` / `aria-valuemin` / `aria-valuemax`。
- フォーカスリングを全インタラクティブ要素に付ける（`focus-visible`、Primary 400 基調）。デザインの静的な見た目は変えない。
- 各ページ・コンポーネントはモバイル幅まで破綻しない。デスクトップの見た目は厳密に維持する。

## 8. セキュリティ上の考慮

- 今回の範囲はプレゼンテーション層のみ。ネットワーク I/O、シークレット、環境変数、外部 API を一切扱わない。トークンやデータセットには触れない。
- 外部リソースを読み込まない。フォントは `next/font/google` によるセルフホストで、実行時にブラウザから Google へのリクエストは発生しない。
- 依存パッケージを追加しないため、サプライチェーン面の増分はない。
- ユーザー入力を扱わない（Search Input は見た目のみで、送信も状態保持もしない）。`dangerouslySetInnerHTML` は使わない。

## 9. 受け入れ基準

1. `/design-system` がリファレンスシートの 14 セクションをすべて、記載どおりの値で表示する。
2. 色・radius・影・タイプスケールが `app/globals.css` のトークンとして一意に定義され、コンポーネントがそれを参照している。
3. Button の 4 バリアント × 3 状態が、シートどおりに描き分けられる。
4. アイコンが outline / filled の両スタイルで揃い、24x24・2px ストローク・丸いラインキャップで統一されている。
5. 4 種のカードがシートどおりの構成・文言配置で表示される。
6. Navbar / Breadcrumbs / Pagination がシートどおりに表示され、適切なセマンティクスを持つ。
7. 依存パッケージの追加がゼロ（`package.json` に差分なし）。
8. `"use client"` が 1 つも入らない。
9. 型チェック・lint・ビルドがすべて通る。
10. 375px 幅でレイアウトが破綻しない（横スクロールが出ない）。

## 10. 実行するチェック

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

ルート（`app/design-system/`）とグローバル CSS を新規に追加するため、`AGENTS.md` セクション 13 に従いビルドまで実行する。実際の出力を報告し、通っていないものを通ったとは言わない。

## 11. 手動テスト手順

1. `npm run dev` を実行し、`http://localhost:3000/design-system` を開く。
2. `design/vertex-designsystem.png` を横に並べ、セクション 01〜14 を上から順に突き合わせる。特に、色の 16 進数ラベル、タイプスケールの表、radius / shadow の数値、Button Specs、Field Specs、Icon Specs の記述が一致すること。
3. Button の各バリアントにマウスを乗せ、Hover 行と同じ見た目に変わることを確認する。Disabled はホバーしても変化せず、クリックできないことを確認する。
4. Search Input と Select をクリックし、フォーカス時にボーダーが `#FB923C` に変わることを確認する。
5. Tab キーだけで Navbar → Buttons → Inputs → Pagination まで到達でき、各要素にフォーカスリングが見えることを確認する。
6. DevTools のデバイスツールバーで幅 375px にし、縦スクロールのみで全セクションが読め、横スクロールが出ないことを確認する。
7. `http://localhost:3000/` を開き、プレースホルダから `/design-system` に遷移できることを確認する。
