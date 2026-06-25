import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDonations } from '@/api/queries';
import { countdown } from '@/lib/utils';
import { Package, PackageCheck, Clock3, AlertTriangle } from 'lucide-react';

export default function AdminDonations() {
  const { data: donations = [], isLoading } = useDonations();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => donations.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()) || d.restaurantName.toLowerCase().includes(search.toLowerCase())),
    [donations, search]
  );

  const count = (s: string) => donations.filter((d) => d.status === s).length;

  return (
    <>
      <PageHeader title="Donation Monitoring" subtitle="Oversee every donation flowing through FoodShare." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Package} label="Total" value={donations.length} delay={0} />
        <StatCard icon={Clock3} label="Active" value={count('active') + count('pending')} gradient="from-accent-400 to-amber-500" delay={0.1} />
        <StatCard icon={PackageCheck} label="Delivered" value={count('delivered')} gradient="from-emerald-400 to-teal-600" delay={0.2} />
        <StatCard icon={AlertTriangle} label="Expired" value={count('expired')} gradient="from-rose-400 to-orange-500" delay={0.3} />
      </div>

      <div className="mb-4 flex justify-end">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search donations…" className="rounded-2xl border border-slate-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900/60" />
        </div>
      </div>

      {isLoading ? (
        <Card><Skeleton className="h-64" /></Card>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Package} title="No donations found" />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-800/50">
                <tr>{['Donation', 'Restaurant', 'NGO', 'Qty', 'Expiry', 'Status', ''].map((h) => <th key={h} className="px-5 py-3.5 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3"><img src={d.images[0]} alt="" className="h-10 w-10 rounded-xl object-cover" /><span className="font-semibold">{d.title}</span></div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{d.restaurantName}</td>
                    <td className="px-5 py-3.5 text-slate-500">{d.ngoName ?? '—'}</td>
                    <td className="px-5 py-3.5 text-slate-500">{d.quantity} {d.unit}</td>
                    <td className="px-5 py-3.5 text-slate-500">{countdown(d.expiresAt)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={d.status} /></td>
                    <td className="px-5 py-3.5 text-right"><Link to={`/track/${d.id}`}><Button variant="ghost" size="sm">View</Button></Link></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
