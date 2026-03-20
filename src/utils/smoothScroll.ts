/**
 * Scroll suave respeitando a navbar fixa e prefers-reduced-motion.
 * Com Lenis ativo, usa a instância para alinhar com o scroll fluido global.
 */

import { getRootLenis } from '../lib/lenisRoot';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Altura da navbar + pequeno respiro, para o título da secção não ficar escondido. */
export function getFixedHeaderOffset(): number {
  if (typeof document === 'undefined') return 80;
  const nav = document.querySelector('.navbar');
  const h = nav?.getBoundingClientRect().height ?? 0;
  return Math.round(h + 12);
}

const PROGRAMMATIC_EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function scrollToTop(options?: { smooth?: boolean }): void {
  const useSmooth = options?.smooth !== false && !prefersReducedMotion();
  const lenis = getRootLenis();

  if (lenis && useSmooth) {
    lenis.scrollTo(0, { duration: 0.95, easing: PROGRAMMATIC_EASE });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: useSmooth ? 'smooth' : 'auto',
  });
}

export function scrollToElement(element: HTMLElement, options?: { smooth?: boolean }): void {
  const useSmooth = options?.smooth !== false && !prefersReducedMotion();
  const offset = getFixedHeaderOffset();
  const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
  const lenis = getRootLenis();

  if (lenis && useSmooth) {
    lenis.scrollTo(top, { duration: 1.05, easing: PROGRAMMATIC_EASE });
    return;
  }

  window.scrollTo({
    top,
    behavior: useSmooth ? 'smooth' : 'auto',
  });
}

/** Faz scroll até o elemento com `id`. Devolve `true` se encontrou. */
export function scrollToId(id: string, options?: { smooth?: boolean }): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToElement(el, options);
  return true;
}
