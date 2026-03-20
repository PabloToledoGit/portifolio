import { useEffect } from 'react';
import { scrollToElement } from '../utils/smoothScroll';

/**
 * Intercepta cliques em links internos (#secao) para scroll suave com offset da navbar.
 * Ignora href="#" (placeholders) e links com target _blank.
 */
export function useSmoothAnchorNavigation(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!target || !(target instanceof HTMLAnchorElement)) return;

      if (target.target === '_blank' || target.hasAttribute('download')) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      // Placeholder tipo <a href="#"> — não forçar scroll ao topo
      if (href === '#' || href === '#!') return;

      const raw = href.slice(1);
      if (!raw) return;

      let id: string;
      try {
        id = decodeURIComponent(raw);
      } catch {
        id = raw;
      }

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      scrollToElement(el);

      try {
        history.pushState(null, '', `#${encodeURIComponent(id)}`);
      } catch {
        // ignore
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
