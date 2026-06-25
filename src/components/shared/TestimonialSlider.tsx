import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { Testimonial } from '@/types';

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative w-[340px] shrink-0 sm:w-[400px]">
      <div className="card flex h-[280px] flex-col overflow-hidden p-7 transition-shadow duration-300 group-hover:shadow-glow">
        {/* decorative gradient blob */}
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />

        {/* header: quote mark + rating */}
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
            <Quote className="h-5 w-5" />
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* quote — flexes to fill, clamped so every card matches */}
        <p className="mt-5 line-clamp-4 flex-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          “{t.quote}”
        </p>

        {/* footer pinned to the bottom */}
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <Avatar src={t.avatar} name={t.name} size="md" ring />
          <div>
            <p className="font-display text-sm font-bold leading-tight">{t.name}</p>
            <p className="text-xs text-slate-400">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialSlider({ items, speed = 40 }: { items: Testimonial[]; speed?: number }) {
  // Render the list twice so the loop is seamless.
  const loop = [...items, ...items];
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2; // width of one full set
    let next = x.get() - (speed * delta) / 1000;
    if (half > 0 && next <= -half) next += half; // wrap seamlessly
    x.set(next);
  });

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950 sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950 sm:w-28" />

      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6">
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}
