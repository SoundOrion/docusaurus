import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {getAnnouncementBar} from './scripts/releasesMeta';

// ===== GitHub リポジトリ情報 =====
const ORG_NAME = 'SoundOrion';
const PROJECT_NAME = 'docusaurus';
const REPO_URL = `https://github.com/${ORG_NAME}/${PROJECT_NAME}`;

// editUrl を組み立てるヘルパー
const buildEditUrl = (path: string) => `${REPO_URL}/tree/main/${path}`;

const config: Config = {
  title: 'Docs Portal',
  tagline: 'Documentation and Release Notes Portal',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // GitHub Pages 用設定
  // Set the production url of your site here
  url: 'https://soundorion.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docusaurus/',
  deploymentBranch: 'gh-pages',

  organizationName: ORG_NAME,
  projectName: PROJECT_NAME,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeConfigs: {
      ja: { htmlLang: 'ja-JP' },
      en: { htmlLang: 'en' },
    },
  },

  // URL 末尾スラッシュ統一
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        // === Docs（ユーザーマニュアル） ===
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: buildEditUrl(''),
          sidebarCollapsed: true,
          sidebarCollapsible: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // 数式（KaTeX）
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        // === Blog（リリースノート） ===
        blog: {
          showReadingTime: false,
          blogTitle: 'リリースノート',
          blogDescription: 'プロダクトのリリース履歴',
          blogSidebarTitle: 'すべてのリリース',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: buildEditUrl(''),
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          routeBasePath: 'releases',     // /releases 配下に
          onUntruncatedBlogPosts: 'warn',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // 数式（KaTeX）
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        theme: {
          customCss: './src/css/custom.css', // ← KaTeX CSS を custom.css で読み込み（後述）
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: { mermaid: true },

  plugins: [
    // === ローカル検索 ===
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        // NOTE: 先頭スラッシュなしの方が安全（baseUrl 変更時の混乱を避ける）
        docsRouteBasePath: 'docs',
        blogRouteBasePath: 'releases',
        language: ['ja', 'en'],
      },
    ],
    // === 画像ズーム ===
    ['docusaurus-plugin-image-zoom', { selector: '.markdown img' }],
     // 👇 追加するカスタムプラグイン
    function yamlLoaderPlugin() {
      return {
        name: 'yaml-loader-plugin',
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /\.ya?ml$/,
                  use: 'yaml-loader',
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    // OGP（Open Graph Protocol）画像
    // サイズ: 1200 × 630 px（16:9 近く）
    // ファイル形式: PNG / JPG / WebP
    // ファイルサイズ: 300KB 以下が理想（読み込み速度的に）
    // image: 'img/docusaurus-social-card.jpg',

    // OS に追随（必要なら手動切替を出す：disableSwitch: false）
    colorMode: {
      respectPrefersColorScheme: true,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    navbar: {
      title: 'Docs Portal',
      logo: {
        alt: 'Docs Portal Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar', // ← sidebars.ts の ID に合わせる（必要ならリネーム）
          position: 'left',
          label: 'ドキュメント',        // ← 「Docs」→「ドキュメント」に変更
        },
        { to: '/releases', label: 'リリースノート', position: 'left' },
        { type: 'localeDropdown', position: 'right' }, // 言語切替
        { href: REPO_URL, label: 'GitHub', position: 'right' },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [{ label: 'ドキュメント', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            }
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'リリースノート', to: '/releases' },
            { label: 'GitHub', href: REPO_URL },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Docs Portal. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'c',           // C
        'cpp',         // C++
        'csharp',      // C#
        'python',      // Python
        'go',          // Go
        'rust',        // Rust
        'ruby',        // Ruby
        'powershell',  // PowerShell
        'bash',        // Bash
        'sql',         // SQL
      ],
    },

    // Announcement bar（お知らせバー）
  announcementBar: getAnnouncementBar(),
  
  } satisfies Preset.ThemeConfig,
};

export default config;
