import { useEffect } from 'react';

const DROP_COUNT = 14;

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function WaterSplashEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const layer = document.createElement('div');
    layer.className = 'water-splash-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    const createSplash = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      const splash = document.createElement('span');
      splash.className = 'water-splash';
      splash.style.setProperty('--x', `${event.clientX}px`);
      splash.style.setProperty('--y', `${event.clientY}px`);

      for (let index = 0; index < DROP_COUNT; index += 1) {
        const drop = document.createElement('span');
        drop.className = 'water-drop';
        drop.style.setProperty('--a', `${index * (360 / DROP_COUNT) + Math.random() * 14}deg`);
        drop.style.setProperty('--d', `${42 + Math.random() * 54}px`);
        drop.style.animationDelay = `${Math.random() * 0.08}s`;
        splash.appendChild(drop);
      }

      layer.appendChild(splash);
      window.setTimeout(() => splash.remove(), 980);
    };

    const updatePointerPosition = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mouse-x', `${x.toFixed(2)}%`);
      document.body.style.setProperty('--mouse-y', `${y.toFixed(2)}%`);
    };

    document.addEventListener('pointerdown', createSplash, { passive: true });
    document.addEventListener('pointermove', updatePointerPosition, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', createSplash);
      document.removeEventListener('pointermove', updatePointerPosition);
      layer.remove();
    };
  }, []);

  return null;
}
