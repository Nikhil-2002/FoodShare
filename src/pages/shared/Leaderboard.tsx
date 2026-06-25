import { motion } from 'framer-motion';
import { Award, Crown, Medal, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { StatSkeleton } from '@/components/ui/Skeleton';
import { useLeaderboard } from '@/api/queries';
import { formatNumber, cn } from '@/lib/utils';

const PODIUM = [
  { place: 2, ring: 'ring-slate-300', grad: 'from-slate-300 to-slate-500', icon: Medal, h: 'h-32' },
  { place: 1, ring: 'ring-amber-400', grad: 'from-amber-300 to-yellow-500', icon: Crown, h: 'h-40' },
  { place: 3, ring: 'ring-orange-400', grad: 'from-orange-300 to-amber-700', icon: Medal, h: 'h-24' },
];

export default function Leaderboard() {
  const { data: entries, isLoading } = useLeaderboard();

  if (isLoading || !entries) {
    return (
      <>
        <PageHeader title="Leaderboard" subtitle="The champions feeding our cities." />
        <div className="grid grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)}</div>
      </>
    );
  }

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const byRank = (r: number) => top3.find((e) => e.rank === r)!;

  return (
    <>
      <PageHeader title="Leaderboard" subtitle="The champions feeding our cities. 🏆" />

      {/* Podium */}
      <div className="mb-8 grid grid-cols-3 items-end gap-3 sm:gap-6">
        {PODIUM.map((p, i) => {
          const e = byRank(p.place);
          return (
            <motion.div key={p.place} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, type: 'spring' }} className="flex flex-col items-center">
              <div className="relative">
                <Avatar src={e.avatar} name={e.name} size="lg" className={cn('ring-4 ring-offset-2 dark:ring-offset-slate-950', p.ring)} />
                <span className={cn('absolute -top-2 left-1/2 -translate-x-1/2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br text-white shadow', p.grad)}>
                  <p.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-center text-sm font-bold">{e.name}</p>
              <p className="flex items-center gap-1 text-xs text-accent-500"><Sparkles className="h-3 w-3" /> {formatNumber(e.points)}</p>
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} transition={{ delay: 0.3 + i * 0.1 }} className={cn('mt-3 grid w-full place-items-start justify-center rounded-t-2xl bg-gradient-to-br pt-3 font-display text-3xl font-extrabold text-white shadow-soft', p.grad, p.h)}>
                #{p.place}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest */}
      <Card className="p-0">
        {rest.map((e, i) => (
          <Reveal key={e.userId} delay={i * 0.05}>
            <div className={cn('flex items-center gap-4 px-5 py-4', i !== rest.length - 1 && 'border-b border-slate-100 dark:border-slate-800', e.name === 'Maya Chen' && 'bg-brand-50/60 dark:bg-brand-950/30')}>
              <span className="w-6 text-center font-display text-lg font-bold text-slate-400">{e.rank}</span>
              <Avatar src={e.avatar} name={e.name} size="sm" />
              <div className="flex-1">
                <p className="font-bold">{e.name} {e.name === 'Maya Chen' && <span className="text-xs text-brand-500">(You)</span>}</p>
                <p className="text-xs text-slate-400">{e.deliveries} deliveries · {e.badges} badges</p>
              </div>
              <Badge tone="brand">{e.level}</Badge>
              <span className="flex w-24 items-center justify-end gap-1 font-bold text-accent-500"><Sparkles className="h-4 w-4" /> {formatNumber(e.points)}</span>
            </div>
          </Reveal>
        ))}
      </Card>
    </>
  );
}
