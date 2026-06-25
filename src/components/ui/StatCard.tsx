import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './AnimatedCounter';

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  prefix,
  trend,
  gradient = 'from-brand-500 to-emerald-700',
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: string;
  gradient?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 120 }}
      whileHover={{ y: -5 }}
      className="card group relative overflow-hidden p-5"
    >
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-25', gradient)} />
      <div className={cn('mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft', gradient)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="font-display text-3xl font-extrabold text-slate-800 dark:text-white">
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      </div>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {trend && (
        <span className="mt-2 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
          {trend}
        </span>
      )}
    </motion.div>
  );
}
