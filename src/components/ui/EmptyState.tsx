import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 py-16 px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-5 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-brand text-white shadow-glow"
      >
        <Icon className="h-9 w-9" />
      </motion.div>
      <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
