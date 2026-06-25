import { Building2, HandHeart, Package, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { TrendChart, CategoryPie } from '@/components/shared/Charts';
import { DONATION_TRENDS, FOOD_CATEGORIES, MOCK_LEADERBOARD } from '@/data/mock';

export default function AdminDashboard() {
  return (
    <>
      <PageHeader title="Admin Overview" subtitle="Platform health at a glance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Users" value={23512} suffix="+" trend="+482 this week" delay={0} />
        <StatCard icon={Building2} label="Restaurants" value={3420} gradient="from-accent-400 to-amber-500" trend="+34 new" delay={0.1} />
        <StatCard icon={HandHeart} label="NGOs" value={612} gradient="from-emerald-400 to-teal-600" trend="+8 new" delay={0.2} />
        <StatCard icon={Package} label="Active Donations" value={1284} gradient="from-violet-400 to-purple-600" trend="Live" delay={0.3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2"><Card><h3 className="mb-4 font-display text-lg font-bold">Platform Activity</h3><TrendChart data={DONATION_TRENDS} /></Card></Reveal>
        <Reveal delay={0.1}><Card className="h-full"><h3 className="mb-4 font-display text-lg font-bold">Donation Mix</h3><CategoryPie data={FOOD_CATEGORIES} /></Card></Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Pending Verifications</h3>
              <Badge tone="warning">4 waiting</Badge>
            </div>
            <div className="space-y-3">
              {[{ n: 'Bella Italia', t: 'Restaurant' }, { n: 'Feed The City', t: 'NGO' }, { n: 'Urban Eats', t: 'Restaurant' }, { n: 'Shelter Plus', t: 'NGO' }].map((x, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800"><ShieldCheck className="h-5 w-5 text-amber-500" /></span>
                  <div className="flex-1"><p className="text-sm font-bold">{x.n}</p><p className="text-xs text-slate-400">{x.t}</p></div>
                  <Badge tone="gray">Review</Badge>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Top Volunteers</h3>
              <TrendingUp className="h-5 w-5 text-brand-500" />
            </div>
            <div className="space-y-3">
              {MOCK_LEADERBOARD.slice(0, 4).map((v) => (
                <div key={v.userId} className="flex items-center gap-3">
                  <span className="w-5 font-display font-bold text-slate-400">#{v.rank}</span>
                  <Avatar src={v.avatar} name={v.name} size="sm" />
                  <p className="flex-1 text-sm font-bold">{v.name}</p>
                  <Badge tone="brand">{v.level}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </>
  );
}
