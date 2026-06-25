import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Lock, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Confetti } from '@/components/ui/Confetti';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { StatSkeleton } from '@/components/ui/Skeleton';
import { useBadges } from '@/api/queries';
import { LEVELS } from '@/config/gamification';
import { cn } from '@/lib/utils';
import type { Badge as BadgeType } from '@/types';

export default function Achievements() {
  const { data: badges, isLoading } = useBadges();
  const [celebrate, setCelebrate] = useState<BadgeType | null>(null);
  const points = 4820;
  const currentIndex = LEVELS.findIndex((l) => points >= l.min && points < l.max);

  const getIcon = (name: string) => (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Award;

  return (
    <>
      <Confetti show={!!celebrate} />
      <PageHeader title="Achievements" subtitle="Level up, unlock badges, become a Legend." />

      {/* Level path */}
      <Reveal>
        <Card className="mb-8">
          <h3 className="mb-6 font-display text-lg font-bold">Your Journey</h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-1">
            {LEVELS.map((l, i) => {
              const reached = i <= currentIndex;
              return (
                <div key={l.name} className="flex flex-1 flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className={cn('grid h-16 w-16 place-items-center rounded-2xl text-2xl shadow-soft', reached ? `bg-gradient-to-br ${l.color} text-white` : 'bg-slate-100 text-slate-300 dark:bg-slate-800')}
                  >
                    {reached ? l.emoji : <Lock className="h-5 w-5" />}
                  </motion.div>
                  <p className={cn('mt-2 text-center text-xs font-semibold', i === currentIndex ? 'text-brand-600' : 'text-slate-400')}>{l.name}</p>
                  {i === currentIndex && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-600 dark:bg-brand-950/40">YOU</span>}
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      <h3 className="mb-4 font-display text-2xl font-bold">Badges</h3>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)}</div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {badges?.map((b, i) => {
            const Icon = getIcon(b.icon);
            return (
              <Reveal key={b.id} delay={i * 0.06}>
                <button onClick={() => b.unlocked && setCelebrate(b)} className="w-full text-left">
                  <Card hover className={cn('relative h-full text-center', !b.unlocked && 'opacity-60')}>
                    {!b.unlocked && <Lock className="absolute right-4 top-4 h-4 w-4 text-slate-400" />}
                    <motion.div whileHover={b.unlocked ? { rotate: [0, -10, 10, 0] } : {}} className={cn('mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft', b.color, !b.unlocked && 'grayscale')}>
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <h4 className="mt-3 font-display font-bold">{b.name}</h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{b.description}</p>
                    {b.unlocked && <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-950/40"><Sparkles className="h-3 w-3" /> Unlocked</span>}
                  </Card>
                </button>
              </Reveal>
            );
          })}
        </div>
      )}

      <Modal open={!!celebrate} onClose={() => setCelebrate(null)} maxWidth="max-w-sm">
        {celebrate && (
          <div className="text-center">
            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className={cn('mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br text-white shadow-glow', celebrate.color)}>
              {(() => { const Icon = getIcon(celebrate.icon); return <Icon className="h-12 w-12" />; })()}
            </motion.div>
            <h3 className="mt-5 font-display text-2xl font-extrabold gradient-text">Badge Unlocked!</h3>
            <p className="mt-1 font-display text-lg font-bold">{celebrate.name}</p>
            <p className="mt-1 text-sm text-slate-500">{celebrate.description}</p>
            <Button className="mt-6" fullWidth onClick={() => setCelebrate(null)}>Awesome! 🎉</Button>
          </div>
        )}
      </Modal>
    </>
  );
}
