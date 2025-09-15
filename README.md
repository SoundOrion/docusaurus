# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

いいですね 👍
Docusaurus 用の Markdown（ブログ記事やドキュメント）を書くときのルールを **README に貼れるようなまとめ** にしてみました。

---

# 📑 Docusaurus 用 Markdown 記法まとめ

## 1. Frontmatter（記事のメタ情報）

Markdown の先頭に `---` で囲って書く。
ここで URL やタイトル、タグなどを設定します。

```markdown
---
slug: vs-2022-17-14
title: Visual Studio 2022 v17.14 リリースノート
authors: [anonymous]
tags: [visual-studio, release, 17.14]
date: 2025-09-14
---
```

* `slug` : URL の末尾（`/releases/vs-2022-17-14`）
* `title` : 記事タイトル
* `authors` : `authors.yml` に登録したキー
* `tags` : タグ（記事の分類に使える）
* `date` : 公開日

---

## 2. 記事本文

通常の Markdown が使えます。

### 見出し

```markdown
# H1 見出し
## H2 見出し
### H3 見出し
```

### 強調

```markdown
**太字**
*斜体*
```

### 箇条書き

```markdown
- リスト1
- リスト2
  - ネストリスト
```

### 番号付きリスト

```markdown
1. 手順1
2. 手順2
```

### コードブロック

````markdown
```js
console.log("Hello Docusaurus");
````

````

### 引用
```markdown
> 引用文
````

---

## 3. トランケート（記事一覧での抜粋を指定）

記事の本文の途中に以下を入れると、
一覧ページではここまでが「抜粋」として表示されます。

```markdown
<!--truncate-->
```

---

## 4. 画像

`static/img/` に配置して呼び出します。

```markdown
![代替テキスト](/img/sample.png)
```

---

## 5. リンク

```markdown
[リンクテキスト](https://example.com)
```

---

## 6. 注意・ヒント（Admonitions）

Docusaurus 独自の便利機能。
以下のように書くと「注意・ヒント・警告」などがきれいに表示されます。

```markdown
:::tip
これはヒントです。
:::

:::note
これは注記です。
:::

:::warning
これは警告です。
:::

:::danger
これは危険！
:::
```

---

## 7. Mermaid 図表

`theme: @docusaurus/theme-mermaid` を有効にしている場合、フローチャートやシーケンス図を描けます。

````markdown
```mermaid
flowchart TD
    A[Start] --> B{条件?}
    B -->|Yes| C[処理1]
    B -->|No| D[処理2]
````

## ライセンス

このプロジェクトは MIT ライセンスのもと公開されています。詳細は [LICENSE](./LICENSE) をご確認ください。

---

### 謝辞
本プロジェクトは、Meta によるオープンソースプロジェクト [Docusaurus](https://docusaurus.io/) をベースに構築されています（MITライセンス）。
