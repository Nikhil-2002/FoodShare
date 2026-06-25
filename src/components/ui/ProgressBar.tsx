import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ProgressBar({
  value,
  className,
  gradient = 'bg-gradient-brand',
}: {
  value: number; // 0-100
  className?: string;
  gradient?: string;
}) {
  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800', className)}>
      <motion.div
        className={cn('h-full rounded-full', gradient)}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(value, 100)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
