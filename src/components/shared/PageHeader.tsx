import { motion } from 'framer-motion';

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-1.5 text-slate-500 dark:text-slate-400">
            {subtitle}
          </motion.p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
