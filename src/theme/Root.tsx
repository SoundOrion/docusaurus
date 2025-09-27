import React, { useEffect } from 'react';

export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement as HTMLElement & { __themeBeforePrint?: string };
    let closedDetails: HTMLDetailsElement[] = [];
    let toRecloseArgs: HTMLElement[] = [];

    const openAllForPrint = () => {
      // 0) デバッグ
      console.log('[print] beforeprint fired');

      // 1) テーマを一時的に light に
      html.__themeBeforePrint = html.getAttribute('data-theme') || '';
      html.setAttribute('data-theme', 'light');

      // 2) details：閉じていたものだけ開く（あとで戻すため記録）
      closedDetails = Array.from(document.querySelectorAll<HTMLDetailsElement>('details:not([open])'));
      closedDetails.forEach(d => { d.open = true; });

      // 3) Arg：閉じていたものだけ開く（data-open="false" を記録）
      toRecloseArgs = Array.from(document.querySelectorAll<HTMLElement>('.arg-collapsible[data-open="false"]'));
      document.querySelectorAll<HTMLElement>('.arg-collapsible').forEach(el => {
        el.setAttribute('data-open', 'true');
      });
    };

    const restoreAfterPrint = () => {
      console.log('[print] afterprint fired');

      // テーマを元に戻す（空なら属性削除）
      if (html.__themeBeforePrint !== undefined) {
        if (html.__themeBeforePrint) html.setAttribute('data-theme', html.__themeBeforePrint);
        else html.removeAttribute('data-theme');
        html.__themeBeforePrint = '';
      }

      // details を元に戻す
      closedDetails.forEach(d => { d.open = false; });
      closedDetails = [];

      // Arg を元に戻す（印刷前に閉じていたものだけ閉じる）
      toRecloseArgs.forEach(el => el.setAttribute('data-open', 'false'));
      toRecloseArgs = [];
    };

    // Chromium/Edge/Safari
    window.addEventListener('beforeprint', openAllForPrint);
    window.addEventListener('afterprint', restoreAfterPrint);

    // Firefox フォールバック
    const mq = window.matchMedia('print');
    const onChange = (e: MediaQueryListEvent) => (e.matches ? openAllForPrint() : restoreAfterPrint());
    // @ts-ignore 旧API対応
    (mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange));

    return () => {
      window.removeEventListener('beforeprint', openAllForPrint);
      window.removeEventListener('afterprint', restoreAfterPrint);
      // @ts-ignore 旧API対応
      (mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange));
    };
  }, []);

  return <>{children}</>;
}
