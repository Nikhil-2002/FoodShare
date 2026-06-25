import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, PlusCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { DonationCard } from '@/components/shared/DonationCard';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useDonations } from '@/api/queries';
import { countdown } from '@/lib/utils';
import type { DonationStatus } from '@/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TABS: { id: string; label: string; status?: DonationStatus }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active', status: 'active' },
  { id: 'pending', label: 'Pending', status: 'pending' },
  { id: 'assigned', label: 'Assigned', status: 'assigned' },
  { id: 'delivered', label: 'Delivered', status: 'delivered' },
  { id: 'expired', label: 'Expired', status: 'expired' },
];

export default function DonationManagement() {
  const [tab, setTab] = useState('all');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const { data: donations = [], isLoading } = useDonations();

  const filtered = useMemo(() => {
    const status = TABS.find((t) => t.id === tab)?.status;
    return status ? donations.filter((d) => d.status === status) : donations;
  }, [donations, tab]);

  const counts = TABS.map((t) => ({ ...t, count: t.status ? donations.filter((d) => d.status === t.status).length : donations.length }));

  return (
    <>
      <PageHeader
        title="Donation Management"
        subtitle="Track every meal from kitchen to community."
        action={<Link to="/app/restaurant/create"><Button><PlusCircle className="h-5 w-5" /> New Donation</Button></Link>}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={counts} active={tab} onChange={setTab} />
        <div className="flex gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          {(['grid', 'table'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={cn('grid h-9 w-9 place-items-center rounded-xl transition-colors', view === v ? 'bg-white text-brand-600 shadow dark:bg-slate-700' : 'text-slate-400')}>
              {v === 'grid' ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Nothing here yet" description="Donations in this category will appear here." />
      ) : view === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => <DonationCard key={d.id} donation={d} delay={i * 0.06} />)}
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-800/50">
                <tr>
                  {['Food', 'Category', 'Qty', 'Expiry', 'Status', ''].map((h) => <th key={h} className="px-5 py-3.5 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={d.images[0]} alt="" className="h-10 w-10 rounded-xl object-cover" />
                        <span className="font-semibold">{d.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{d.category}</td>
                    <td className="px-5 py-3.5 text-slate-500">{d.quantity} {d.unit}</td>
                    <td className="px-5 py-3.5 text-slate-500">{countdown(d.expiresAt)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={d.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <Link to={`/track/${d.id}`}><Button variant="ghost" size="sm">Track</Button></Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
