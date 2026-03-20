import type Lenis from 'lenis';

/** Instância root do Lenis (registada por `LenisInstanceBridge`). */
let rootLenis: Lenis | null = null;

export function registerRootLenis(instance: Lenis | null): void {
  rootLenis = instance;
}

export function getRootLenis(): Lenis | null {
  return rootLenis;
}
