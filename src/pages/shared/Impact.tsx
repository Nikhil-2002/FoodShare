import { Leaf, PackageCheck, Recycle, Users, Utensils, Wind } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { StatSkeleton } from '@/components/ui/Skeleton';
import { TrendChart, CategoryPie, ImpactBars } from '@/components/shared/Charts';
import { DONATION_TRENDS, FOOD_CATEGORIES, MONTHLY_IMPACT } from '@/data/mock';
import { useImpact } from '@/api/queries';

export default function Impact() {
  const { data, isLoading } = useImpact();

  return (
    <>
      <PageHeader title="Global Impact" subtitle="Every number here is a meal saved and a life touched." />

      {isLoading || !data ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}</div>
      ) : (
        <>
          {/* Hero banner */}
          <Reveal>
            <Card className="relative mb-6 overflow-hidden bg-gradient-to-br from-brand-600 to-emerald-800 text-white">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <Leaf className="h-8 w-8 text-accent-300" />
              <p className="mt-3 font-display text-lg font-semibold">Together we’ve prevented</p>
              <div className="font-display text-5xl font-extrabold sm:text-6xl"><AnimatedCounter value={data.co2Prevented} suffix=" kg" /></div>
              <p className="mt-1 text-white/80">of CO₂ emissions — equal to taking 140 cars off the road for a year.</p>
            </Card>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Utensils} label="Food Saved (meals)" value={data.mealsSaved} suffix="+" delay={0} />
            <StatCard icon={PackageCheck} label="Meals Delivered" value={data.deliveries} suffix="+" gradient="from-accent-400 to-amber-500" delay={0.1} />
            <StatCard icon={Users} label="People Helped" value={data.peopleHelped} suffix="+" gradient="from-emerald-400 to-teal-600" delay={0.2} />
            <StatCard icon={Recycle} label="Waste Reduced (kg)" value={data.wasteReduced} suffix="+" gradient="from-violet-400 to-purple-600" delay={0.3} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2"><Card><h3 className="mb-4 font-display text-lg font-bold">Rescue Trends</h3><TrendChart data={DONATION_TRENDS} /></Card></Reveal>
            <Reveal delay={0.1}><Card className="h-full"><h3 className="mb-4 font-display text-lg font-bold">By Category</h3><CategoryPie data={FOOD_CATEGORIES} /></Card></Reveal>
          </div>

          <Reveal className="mt-6">
            <Card>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold"><Wind className="h-5 w-5 text-brand-500" /> Monthly Impact</h3>
              <ImpactBars data={MONTHLY_IMPACT} />
            </Card>
          </Reveal>
        </>
      )}
    </>
  );
}
