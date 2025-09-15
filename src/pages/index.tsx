import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Docs Portal"
      description="社内システムのサポートサイト。ドキュメントとリリースノートをまとめて確認できます。">
      <Hero />
    </Layout>
  );
}

function Hero() {
  return (
    <header className={clsx('container', styles.hero)}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroTitle}>
          社内システムのサポートサイト。<br />
          ドキュメントとリリースノートを、<br />
          ひとつのポータルで。
        </Heading>
        <p className={styles.heroLead}>
          利用方法から最新の変更点まで。<br />
          必要な情報をまとめて確認できます。
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
