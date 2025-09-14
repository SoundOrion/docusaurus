import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
  to: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
};

const FeatureList: FeatureItem[] = [
  {
    title: '📘 ドキュメント',
    description: <>製品の使い方・手順書・トラブルシューティング。</>,
    to: '/docs/intro',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
  },
  {
    title: '📰 リリースノート',
    description: <>バージョンごとの新機能・修正・既知の注意点。</>,
    to: '/releases',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  },
];

function Card({title, description, to, Svg}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <Link className={styles.card} to={to}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
