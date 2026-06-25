import { Link } from 'react-router-dom';
import { Award, HandHeart, PlusCircle, TrendingUp, Utensils } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { TrendChart, CategoryPie, ImpactBars } from '@/components/shared/Charts';
import { DonationCard } from '@/components/shared/DonationCard';
import { DONATION_TRENDS, FOOD_CATEGORIES, MONTHLY_IMPACT } from '@/data/mock';
import { useDonations } from '@/api/queries';

export default function RestaurantDashboard() {
  const { data: donations, isLoading } = useDonations();
  const recent = donations?.slice(0, 3) ?? [];

  return (
    <>
      <PageHeader
        title="Welcome back, Green Fork 👋"
        subtitle="Here’s the impact you’re making today."
        action={<Link to="/app/restaurant/create"><Button size="lg"><PlusCircle className="h-5 w-5" /> New Donation</Button></Link>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Utensils} label="Total Donations" value={148} trend="+12 this week" delay={0} />
        <StatCard icon={HandHeart} label="Meals Saved" value={6240} suffix="+" gradient="from-accent-400 to-amber-500" trend="+320 this week" delay={0.1} />
        <StatCard icon={TrendingUp} label="NGOs Served" value={28} gradient="from-emerald-400 to-teal-600" trend="+3 new" delay={0.2} />
        <StatCard icon={Award} label="Impact Score" value={94} suffix="/100" gradient="from-violet-400 to-purple-600" trend="Top 5%" delay={0.3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Donation Trends</h3>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-950/40">This week</span>
            </div>
            <TrendChart data={DONATION_TRENDS} />
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full">
            <h3 className="mb-4 font-display text-lg font-bold">Food Categories</h3>
            <CategoryPie data={FOOD_CATEGORIES} />
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <Card>
          <h3 className="mb-4 font-display text-lg font-bold">Monthly Impact — Meals vs People Helped</h3>
          <ImpactBars data={MONTHLY_IMPACT} />
        </Card>
      </Reveal>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Recent Donations</h2>
        <Link to="/app/restaurant/donations"><Button variant="ghost" size="sm">View all</Button></Link>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
        ) : recent.length ? (
          recent.map((d, i) => <DonationCard key={d.id} donation={d} delay={i * 0.1} />)
        ) : (
          <div className="md:col-span-2 lg:col-span-3">
            <EmptyState title="No donations yet" description="Create your first donation to start saving meals." action={<Link to="/app/restaurant/create"><Button>Create donation</Button></Link>} />
          </div>
        )}
      </div>
    </>
  );
}
