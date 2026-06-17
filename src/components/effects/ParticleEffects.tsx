import { useStore } from '@nanostores/react';
import { particleMode, initParticleMode } from '@store/particles';
import { useEffect } from 'react';

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 43 + 7) % 100}%`,
  delay: `${-((index * 1.37) % 12)}s`,
  duration: `${10 + (index % 7) * 1.4}s`,
  size: `${6 + (index % 5) * 2}px`,
  drift: `${-36 + (index % 9) * 9}px`,
}));

export default function ParticleEffects() {
  const mode = useStore(particleMode);

  useEffect(() => {
    initParticleMode();
  }, []);

  if (mode === 'off') return null;

  return (
    <div className={`ambient-particles ambient-particles-${mode}`} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="ambient-particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
            '--particle-drift': particle.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
