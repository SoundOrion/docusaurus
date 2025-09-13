import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// GitHub リポジトリ情報を変数化
const ORG_NAME = 'SoundOrion';
const PROJECT_NAME = 'docusaurus';
const REPO_URL = `https://github.com/${ORG_NAME}/${PROJECT_NAME}`;

// editUrl を組み立てるヘルパー
const buildEditUrl = (path: string) => `${REPO_URL}/tree/main/${path}`;

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: ORG_NAME,
  projectName: PROJECT_NAME,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: buildEditUrl(''), // docs 以下は Docusaurus が追記してくれる
          sidebarCollapsed: true,
          sidebarCollapsible: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: false,         // 読了時間は通常不要
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
          // routeBasePath: 'releases',   // URL が /releases になる
          onUntruncatedBlogPosts: 'warn',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: { mermaid: true },

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        language: ['ja', 'en'],
      },
    ],
    ['docusaurus-plugin-image-zoom', { selector: '.markdown img' }],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    // 最終更新を JST で表示
    lastUpdated: {
      text: ({lastUpdatedAt}) => {
        const date = new Date(lastUpdatedAt * 1000);
        return `最終更新: ${date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`;
      },
    },

    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: REPO_URL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Tutorial', to: '/docs/intro' }],
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
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: REPO_URL },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
