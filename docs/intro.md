---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.


```mermaid
flowchart LR
  A[Start] --> B{条件}
  B -->|はい| C[処理]
  B -->|いいえ| D[中止]
```

:::tip ヒント
ここにコツを書く
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Windows">…</TabItem>
  <TabItem value="Linux">…</TabItem>
</Tabs>


```bash title="デプロイ手順" {1,3}
npm ci
npm run build
- onBrokenLinks: 'throw'
+ onBrokenLinks: 'log'
```

なるほど！幅広い言語を扱う予定ですね 👍
その場合、**Prism の追加言語設定にまとめて登録**しておくのがおすすめです。

---


## 🔹 各言語の Markdown 記法サンプル

```csharp
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello from C#!");
    }
}
```

```python
def hello():
    print("Hello from Python!")

hello()
```

```go
package main
import "fmt"
func main() {
    fmt.Println("Hello from Go!")
}
```

```rust
fn main() {
    println!("Hello from Rust!");
}
```

```ruby
puts "Hello from Ruby!"
```

```powershell
Write-Output "Hello from PowerShell!"
```

```bash
echo "Hello from Bash!"
```

```sql
SELECT id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;
```
