import { Link } from 'react-router-dom';
import { HandHeart, Package, PackageCheck, Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { TrendChart, ImpactBars } from '@/components/shared/Charts';
import { DonationCard } from '@/components/shared/DonationCard';
import { DONATION_TRENDS, MONTHLY_IMPACT } from '@/data/mock';
import { useDonations, useUpdateStatus } from '@/api/queries';

export default function NgoDashboard() {
  const { data: donations, isLoading } = useDonations('active');
  const update = useUpdateStatus();
  const available = donations?.slice(0, 3) ?? [];

  return (
    <>
      <PageHeader
        title="Hope Kitchen Dashboard"
        subtitle="Meals received, lives changed."
        action={<Link to="/app/ngo/available"><Button size="lg"><Package className="h-5 w-5" /> Browse Food</Button></Link>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={PackageCheck} label="Meals Received" value={12480} suffix="+" delay={0} />
        <StatCard icon={HandHeart} label="Deliveries Completed" value={342} gradient="from-accent-400 to-amber-500" delay={0.1} />
        <StatCard icon={Users} label="Beneficiaries Served" value={8900} suffix="+" gradient="from-emerald-400 to-teal-600" delay={0.2} />
        <StatCard icon={Package} label="Active Requests" value={6} gradient="from-violet-400 to-purple-600" delay={0.3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal><Card><h3 className="mb-4 font-display text-lg font-bold">Weekly Intake</h3><TrendChart data={DONATION_TRENDS} /></Card></Reveal>
        <Reveal delay={0.1}><Card><h3 className="mb-4 font-display text-lg font-bold">Monthly Impact</h3><ImpactBars data={MONTHLY_IMPACT} /></Card></Reveal>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Available Nearby</h2>
        <Link to="/app/ngo/available"><Button variant="ghost" size="sm">View all</Button></Link>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : available.map((d, i) => (
              <DonationCard key={d.id} donation={d} delay={i * 0.1} action={{ label: 'Accept', loading: update.isPending, onClick: () => update.mutate({ id: d.id, status: 'assigned' }) }} />
            ))}
      </div>
    </>
  );
}
