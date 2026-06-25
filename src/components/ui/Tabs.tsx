import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/60">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
              isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl bg-gradient-brand shadow-soft"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {t.label}
              {t.count !== undefined && (
                <span className={cn('rounded-full px-1.5 text-xs', isActive ? 'bg-white/25' : 'bg-slate-200 dark:bg-slate-700')}>
                  {t.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
