import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, Flame, MapPin, Route, Sparkles, Star, Trophy } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TrendChart } from '@/components/shared/Charts';
import { DonationCard } from '@/components/shared/DonationCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { DONATION_TRENDS } from '@/data/mock';
import { useDonations, useUpdateStatus } from '@/api/queries';
import { LEVELS } from '@/config/gamification';

export default function VolunteerDashboard() {
  const { data: donations, isLoading } = useDonations('active');
  const update = useUpdateStatus();
  const pickups = donations?.slice(0, 3) ?? [];

  const points = 4820;
  const currentLevel = LEVELS.find((l) => points >= l.min && points < l.max) ?? LEVELS[0];
  const next = LEVELS[LEVELS.indexOf(currentLevel) + 1];
  const progress = next ? ((points - currentLevel.min) / (next.min - currentLevel.min)) * 100 : 100;

  return (
    <>
      <PageHeader
        title="Hey Maya, ready to ride? 🚴"
        subtitle="Your next good deed is one tap away."
        action={<Link to="/app/volunteer/pickups"><Button size="lg"><Bike className="h-5 w-5" /> Find Pickups</Button></Link>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Bike} label="Deliveries Completed" value={112} delay={0} />
        <StatCard icon={Route} label="Distance Travelled" value={1840} suffix=" km" gradient="from-accent-400 to-amber-500" delay={0.1} />
        <StatCard icon={Sparkles} label="Points Earned" value={4820} gradient="from-violet-400 to-purple-600" delay={0.2} />
        <StatCard icon={Flame} label="Day Streak" value={23} gradient="from-rose-400 to-orange-500" delay={0.3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card><h3 className="mb-4 font-display text-lg font-bold">Your Activity</h3><TrendChart data={DONATION_TRENDS} /></Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-brand-600 to-emerald-800 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="flex items-center gap-2"><Trophy className="h-6 w-6 text-accent-300" /><span className="font-display text-sm font-bold uppercase tracking-wide">Current Level</span></div>
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mt-3 font-display text-4xl font-extrabold">{currentLevel.name}</motion.p>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-white/80"><span>{points} pts</span>{next && <span>{next.min} pts → {next.name}</span>}</div>
              <div className="mt-2"><ProgressBar value={progress} gradient="bg-gradient-warm" /></div>
            </div>
            <div className="mt-5 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent-300 text-accent-300" />)}
              <span className="ml-2 text-sm text-white/80">4.9 volunteer rating</span>
            </div>
            <Link to="/app/volunteer/achievements" className="mt-5 inline-block"><Button variant="warm" size="sm">View achievements</Button></Link>
          </Card>
        </Reveal>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Nearby Pickups</h2>
        <Link to="/app/volunteer/pickups"><Button variant="ghost" size="sm">View all</Button></Link>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : pickups.map((d, i) => (
              <DonationCard key={d.id} donation={d} delay={i * 0.1} action={{ label: 'Accept', loading: update.isPending, onClick: () => update.mutate({ id: d.id, status: 'picked_up' }) }} />
            ))}
      </div>
    </>
  );
}
