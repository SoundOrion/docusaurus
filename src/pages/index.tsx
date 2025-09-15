import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Docs Portal"
      description="社内プロダクトのドキュメントとリリースノートのポータルサイト">
      <Hero />
    </Layout>
  );
}

function Hero() {
  return (
    <header className={clsx('container', styles.hero)}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroTitle}>
          ドキュメントとリリースノートを、<br />ひとつのポータルで。
        </Heading>
        <p className={styles.heroLead}>
          Markdown を書いて push するだけ。CI/CD が自動で公開。<br />
          画像ズーム・検索・数式・i18n まで標準対応。
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            📘 ドキュメントを見る
          </Link>
          <Link className="button button--secondary button--lg" to="/releases">
            📰 リリースノート
          </Link>
        </div>
      </div>
      {/* 背景のグラデーション */}
      <div aria-hidden className={styles.heroBgA} />
      <div aria-hidden className={styles.heroBgB} />
    </header>
  );
}
