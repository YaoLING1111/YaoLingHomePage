import { atom } from 'nanostores';

export type ParticleMode = 'off' | 'sakura' | 'snow';

const STORAGE_KEY = 'ambient-particle-mode';
const validModes: ParticleMode[] = ['off', 'sakura', 'snow'];

export const particleMode = atom<ParticleMode>('off');

function syncParticleClass(mode: ParticleMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.particles = mode;
}

export function initParticleMode() {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(STORAGE_KEY) as ParticleMode | null;
  const mode = stored && validModes.includes(stored) ? stored : 'off';
  particleMode.set(mode);
  syncParticleClass(mode);
}

export function setParticleMode(mode: ParticleMode) {
  particleMode.set(mode);
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, mode);
  syncParticleClass(mode);
}

export function cycleParticleMode() {
  const current = particleMode.get();
  const next = validModes[(validModes.indexOf(current) + 1) % validModes.length];
  setParticleMode(next);
}
