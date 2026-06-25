import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { TrackingEvent } from '@/types';
import { cn } from '@/lib/utils';

export function StatusTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <ol className="relative space-y-6">
      {events.map((e, i) => {
        const active = e.done && (i === events.length - 1 || !events[i + 1]?.done);
        return (
          <motion.li key={e.stage} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative flex gap-4 pl-2">
            {i < events.length - 1 && (
              <span className={cn('absolute left-[19px] top-8 h-full w-0.5', e.done ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700')} />
            )}
            <span className={cn('relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full', e.done ? 'bg-gradient-brand text-white' : 'bg-slate-100 text-slate-300 dark:bg-slate-800')}>
              {e.done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-slate-300" />}
              {active && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400/40" />}
            </span>
            <div className="pb-1">
              <p className={cn('font-semibold', e.done ? 'text-slate-800 dark:text-white' : 'text-slate-400')}>{e.label}</p>
              {e.time && <p className="text-xs text-slate-400">{new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
