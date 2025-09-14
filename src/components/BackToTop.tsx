import React from 'react';

export default function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      // 300px 以上スクロールしたら表示
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="ページトップへ"
      onClick={scrollTop}
      className={`backToTop ${visible ? 'show' : ''}`}
    >
      {/* シンプルな上矢印アイコン（SVG） */}
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l-8 8h6v8h4v-8h6z" fill="currentColor" />
      </svg>
    </button>
  );
}
