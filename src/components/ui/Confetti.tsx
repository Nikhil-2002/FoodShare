import { AnimatePresence, motion } from 'framer-motion';

const COLORS = ['#10b981', '#fb923c', '#f59e0b', '#34d399', '#6ee7b7', '#ef4444'];

// Deterministic pseudo-random so we don't rely on Math.random at module scope.
const pieces = Array.from({ length: 60 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  return {
    id: i,
    x: (rnd * 2 - 1) * 320,
    rotate: rnd * 720 - 360,
    delay: rnd * 0.3,
    color: COLORS[i % COLORS.length],
    size: 6 + rnd * 8,
  };
});

export function Confetti({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[60] flex items-start justify-center overflow-hidden">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: -40, x: 0, rotate: 0 }}
              animate={{ opacity: 0, y: '100vh', x: p.x, rotate: p.rotate }}
              transition={{ duration: 2.4, delay: p.delay, ease: 'easeIn' }}
              style={{ width: p.size, height: p.size, background: p.color, borderRadius: 2 }}
              className="absolute top-0"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
