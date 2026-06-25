import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Search, UserCog } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ADMIN_USERS } from '@/data/adminMock';
import { ROLE_LABEL } from '@/config/navigation';

const statusTone = { active: 'success', pending: 'warning', suspended: 'danger' } as const;

export default function AdminUsers() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'all', label: 'All', count: ADMIN_USERS.length },
    { id: 'restaurant', label: 'Restaurants', count: ADMIN_USERS.filter((u) => u.role === 'restaurant').length },
    { id: 'ngo', label: 'NGOs', count: ADMIN_USERS.filter((u) => u.role === 'ngo').length },
    { id: 'volunteer', label: 'Volunteers', count: ADMIN_USERS.filter((u) => u.role === 'volunteer').length },
  ];

  const filtered = ADMIN_USERS.filter((u) => (tab === 'all' || u.role === tab) && u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader title="User Management" subtitle="Manage every member of the FoodShare platform." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users…" className="rounded-2xl border border-slate-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-900/60" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={UserCog} title="No users found" />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-800/50">
                <tr>{['User', 'Role', 'Status', 'Joined', 'Contributions', ''].map((h) => <th key={h} className="px-5 py-3.5 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3"><Avatar src={u.avatar} name={u.name} size="sm" /><div><p className="font-semibold">{u.name}</p><p className="text-xs text-slate-400">{u.email}</p></div></div>
                    </td>
                    <td className="px-5 py-3.5"><Badge tone="brand">{ROLE_LABEL[u.role]}</Badge></td>
                    <td className="px-5 py-3.5"><Badge tone={statusTone[u.status]} className="capitalize">{u.status}</Badge></td>
                    <td className="px-5 py-3.5 text-slate-500">{u.joined}</td>
                    <td className="px-5 py-3.5 text-slate-500">{u.contributions}</td>
                    <td className="px-5 py-3.5 text-right"><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><MoreVertical className="h-4 w-4" /></button></td>
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
