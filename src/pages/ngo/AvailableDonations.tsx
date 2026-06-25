import { useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Input';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { DonationCard } from '@/components/shared/DonationCard';
import { useDonations, useUpdateStatus } from '@/api/queries';
import type { FoodCategory } from '@/types';

export default function AvailableDonations() {
  const { data: donations = [], isLoading } = useDonations();
  const update = useUpdateStatus();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState(50);
  const [sort, setSort] = useState('expiry');

  const filtered = useMemo(() => {
    let list = donations.filter((d) => ['active', 'pending'].includes(d.status));
    if (search) list = list.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()) || d.restaurantName.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') list = list.filter((d) => d.category === category);
    list = list.filter((d) => d.distanceKm <= maxDistance);
    list = [...list].sort((a, b) => {
      if (sort === 'expiry') return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      if (sort === 'distance') return a.distanceKm - b.distanceKm;
      return b.quantity - a.quantity;
    });
    return list;
  }, [donations, search, category, maxDistance, sort]);

  const categories: (FoodCategory | 'all')[] = ['all', 'Cooked Meals', 'Bakery', 'Fruits & Vegetables', 'Dairy', 'Packaged', 'Beverages', 'Grains'];

  return (
    <>
      <PageHeader title="Available Donations" subtitle={`${filtered.length} fresh donations near you right now.`} />

      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search food or restaurant…" className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900/60" />
          </div>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} icon={<Filter className="h-4 w-4" />}>
            {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>)}
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} icon={<SlidersHorizontal className="h-4 w-4" />}>
            <option value="expiry">Expiring soon</option>
            <option value="distance">Nearest</option>
            <option value="quantity">Largest quantity</option>
          </Select>
        </div>
        <div className="mt-4">
          <label className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
            <span>Max distance</span>
            <span className="text-brand-600">{maxDistance} km</span>
          </label>
          <input type="range" min={1} max={50} value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} className="mt-2 w-full accent-brand-500" />
        </div>
      </Card>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Search} title="No donations match your filters" description="Try widening your distance or clearing the search." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <DonationCard key={d.id} donation={d} delay={i * 0.06} action={{ label: 'Accept', loading: update.isPending, onClick: () => update.mutate({ id: d.id, status: 'assigned' }) }} />
          ))}
        </div>
      )}
    </>
  );
}
