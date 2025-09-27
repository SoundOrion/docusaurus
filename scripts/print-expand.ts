// 印刷（PDF保存）時に折り畳みを自動展開し、印刷後に元へ戻す。
// <details> と aria-expanded/aria-controls に幅広く対応。
// 状態は WeakSet / WeakMap で管理してDOMを汚さない。

if (typeof window !== "undefined") {
  const detailsClosed = new WeakSet<HTMLDetailsElement>();
  const ariaWasCollapsed = new WeakSet<HTMLElement>();
  const panelPrevDisplay = new WeakMap<HTMLElement, string>();

  const openForPrint = () => {
    // 1) <details> を全部開く
    document.querySelectorAll<HTMLDetailsElement>("details").forEach((d) => {
      if (!d.open) {
        detailsClosed.add(d);
        d.open = true;
      }
    });

    // 2) ariaで閉じているUIを開く（aria-controlsがあればパネルも表示）
    document
      .querySelectorAll<HTMLElement>('[aria-expanded="false"]')
      .forEach((el) => {
        ariaWasCollapsed.add(el);
        el.setAttribute("aria-expanded", "true");

        const id = el.getAttribute("aria-controls");
        if (id) {
          const panel = document.getElementById(id) as
            | (HTMLElement & { style: CSSStyleDeclaration })
            | null;
          if (panel) {
            panelPrevDisplay.set(panel, panel.style.display);
            panel.style.display = ""; // 可能なら表示
            panel.style.maxHeight = "none";
            panel.style.overflow = "visible";
            panel.style.opacity = "1";
          }
        }
      });
  };

  const restoreAfterPrint = () => {
    // 1) <details> を元に戻す
    document.querySelectorAll<HTMLDetailsElement>("details").forEach((d) => {
      if (detailsClosed.has(d)) {
        d.open = false;
        detailsClosed.delete(d);
      }
    });

    // 2) aria系を元に戻す
    document
      .querySelectorAll<HTMLElement>('[aria-expanded="true"]')
      .forEach((el) => {
        if (ariaWasCollapsed.has(el)) {
          el.setAttribute("aria-expanded", "false");
          ariaWasCollapsed.delete(el);

          const id = el.getAttribute("aria-controls");
          if (id) {
            const panel = document.getElementById(id) as
              | (HTMLElement & { style: CSSStyleDeclaration })
              | null;
            if (panel) {
              const prev = panelPrevDisplay.get(panel);
              panel.style.display = prev ?? "";
              panelPrevDisplay.delete(panel);
            }
          }
        }
      });
  };

  // beforeprint/afterprint に対応しつつ、未サポート環境では matchMedia を併用
  const setupPrintHooks = () => {
    if ("onbeforeprint" in window) {
      window.addEventListener("beforeprint", openForPrint);
      window.addEventListener("afterprint", restoreAfterPrint);
      return;
    }
    const mql = window.matchMedia("print");
    const handler = (e: MediaQueryListEvent) =>
      e.matches ? openForPrint() : restoreAfterPrint();

    // 古いブラウザ対応
    // @ts-expect-error: addListener は古い型定義だが実装上ある場合がある
    if (!mql.addEventListener && mql.addListener) {
      // @ts-ignore
      mql.addListener(handler);
    } else {
      mql.addEventListener("change", handler);
    }
  };

  setupPrintHooks();
}
