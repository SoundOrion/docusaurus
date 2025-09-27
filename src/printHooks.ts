if (typeof window !== 'undefined') {
  const html = document.documentElement as HTMLElement & { __themeBeforePrint?: string };
  let closedDetails: HTMLDetailsElement[] = [];
  let argToReclose: HTMLElement[] = [];

  const openAllForPrint = () => {
    // テーマ退避＆ライト化
    html.__themeBeforePrint = html.getAttribute('data-theme') || '';
    html.setAttribute('data-theme', 'light');

    // details を一時展開（閉じてたものだけ記録）
    closedDetails = Array.from(document.querySelectorAll<HTMLDetailsElement>('details:not([open])'));
    closedDetails.forEach(d => { d.open = true; });

    // Arg を一時展開（閉じてたものだけ記録）
    argToReclose = Array.from(document.querySelectorAll<HTMLElement>('.arg-collapsible[data-open="false"]'));
    document.querySelectorAll<HTMLElement>('.arg-collapsible').forEach(el => {
      el.setAttribute('data-open', 'true');
    });
  };

  const restoreAfterPrint = () => {
    // テーマ戻す
    if (html.__themeBeforePrint !== undefined) {
      if (html.__themeBeforePrint) html.setAttribute('data-theme', html.__themeBeforePrint);
      else html.removeAttribute('data-theme');
      html.__themeBeforePrint = '';
    }
    // details 戻す
    closedDetails.forEach(d => { d.open = false; });
    closedDetails = [];
    // Arg 戻す
    argToReclose.forEach(el => el.setAttribute('data-open', 'false'));
    argToReclose = [];
  };

  // Chrome/Edge/Safari
  window.addEventListener('beforeprint', openAllForPrint);
  window.addEventListener('afterprint', restoreAfterPrint);

  // Firefox フォールバック
  const mq = window.matchMedia('print');
  const onChange = (e: MediaQueryListEvent) => (e.matches ? openAllForPrint() : restoreAfterPrint());
  // @ts-ignore 旧API対応
  (mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange));
}
