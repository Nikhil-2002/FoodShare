import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        node.textContent =
          prefix + (decimals ? v.toFixed(decimals) : formatNumber(v)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, suffix, prefix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
