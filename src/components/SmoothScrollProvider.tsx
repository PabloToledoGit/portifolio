import { useEffect, useState, type ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { registerRootLenis } from '../lib/lenisRoot';

/** Opções estáveis — evitar recriar Lenis a cada render. */
const LENIS_OPTIONS = {
  autoRaf: true,
  /** Quanto menor, mais “pesado” e fluido o scroll (0.05–0.12 é comum). */
  lerp: 0.085,
  wheelMultiplier: 0.92,
  smoothWheel: true,
  touchMultiplier: 1,
  /** Scroll mais natural em touch (mobile). */
  syncTouch: true,
  syncTouchLerp: 0.075,
  infinite: false,
} as const;

function LenisInstanceBridge() {
  const lenis = useLenis();

  useEffect(() => {
    registerRootLenis(lenis ?? null);
    return () => registerRootLenis(null);
  }, [lenis]);

  return null;
}

/**
 * Scroll global suave (roda / trackpad / touch) via Lenis.
 * Com `prefers-reduced-motion: reduce`, desativa para respeitar acessibilidade.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisInstanceBridge />
      {children}
    </ReactLenis>
  );
}
