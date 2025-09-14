import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';

type ReleaseInfo = { file: string; date: Date; title?: string; slug?: string };

function toDate(v?: string | number | Date) {
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
}

// blogDir は既定 'blog'。あなたが blogDir を変えていなければ blog/ を見る。
// 念のため 'releases/' 直下に置いているケースもサポート。
const candidateDirs = ['blog', 'releases'];

// routeBasePath は config 側で 'releases' を使っている想定。
const ROUTE_BASE = 'releases';

export function getAnnouncementBar() {
  const siteDir = process.cwd();
  const contentDir = candidateDirs
    .map((d) => path.join(siteDir, d))
    .find((p) => fs.existsSync(p));

  if (!contentDir) return undefined;

  // .md / .mdx のみを対象
  const files = fg.sync('**/*.{md,mdx}', { cwd: contentDir, absolute: true });
  if (!files.length) return undefined;

  const releases: ReleaseInfo[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file, 'utf8');
      const fm = matter(raw);
      const front = fm.data as any;

      // date は frontmatter 優先。なければファイル名 YYYY-MM-DD から推測。
      let date =
        toDate(front.date) ||
        toDate(path.basename(file).match(/\d{4}-\d{2}-\d{2}/)?.[0]);

      if (!date) continue;

      const title: string | undefined = front.title;
      // slug があれば使う。なければファイル名から推定（拡張子除く）
      const slug: string | undefined =
        (typeof front.slug === 'string' ? front.slug.replace(/^\//, '') : undefined) ||
        path.basename(file).replace(path.extname(file), '');

      releases.push({ file, date, title, slug });
    } catch {
      // 破損した Markdown はスキップ
    }
  }

  if (!releases.length) return undefined;

  // 最新（date の降順）
  releases.sort((a, b) => b.date.getTime() - a.date.getTime());
  const latest = releases[0];

  // id は日付でユニークに。例: release-2025-09-14
  const y = latest.date.getFullYear();
  const m = String(latest.date.getMonth() + 1).padStart(2, '0');
  const d = String(latest.date.getDate()).padStart(2, '0');
  const id = `release-${y}-${m}-${d}`;

  // 表示テキスト
  const label = latest.title ?? '新しいリリースノートを公開しました';
  // slug が 'vs-2022-17-14' などなら /releases/vs-2022-17-14 へ
  const href = `/${ROUTE_BASE}/${latest.slug ?? ''}`.replace(/\/+$/, '');

  return {
    id,
    content: `📰 ${label}　<a href="${href}" target="_self">詳細を見る</a>`,
    backgroundColor: '#005b47',
    textColor: '#ffffff',
    isCloseable: true,
  };
}
