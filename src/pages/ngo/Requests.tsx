import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Check, MapPin, UserPlus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useDonations, useUpdateStatus } from '@/api/queries';
import { MOCK_LEADERBOARD } from '@/data/mock';
import { countdown } from '@/lib/utils';

export default function Requests() {
  const { data: donations = [], isLoading } = useDonations();
  const update = useUpdateStatus();
  const [tab, setTab] = useState('assigned');
  const [assignFor, setAssignFor] = useState<string | null>(null);

  const accepted = donations.filter((d) => ['assigned', 'picked_up', 'on_the_way', 'delivered'].includes(d.status));
  const tabs = [
    { id: 'assigned', label: 'In Progress', count: accepted.filter((d) => d.status !== 'delivered').length },
    { id: 'delivered', label: 'Delivered', count: accepted.filter((d) => d.status === 'delivered').length },
  ];
  const list = accepted.filter((d) => (tab === 'delivered' ? d.status === 'delivered' : d.status !== 'delivered'));

  return (
    <>
      <PageHeader title="Requests Management" subtitle="Accept donations, assign volunteers, track delivery." />
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <CardSkeleton />
        ) : list.length === 0 ? (
          <EmptyState icon={Bike} title="No requests here" description="Accepted donations will show up in this tab." />
        ) : (
          list.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img src={d.images[0]} alt="" className="h-20 w-full rounded-2xl object-cover sm:w-24" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold">{d.title}</h3>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-4 w-4" /> {d.pickupAddress} · {d.quantity} {d.unit} · {countdown(d.expiresAt)}</p>
                  {d.volunteerName && (
                    <p className="mt-2 flex items-center gap-2 text-sm"><Avatar src={`https://i.pravatar.cc/100?img=45`} name={d.volunteerName} size="xs" /> <span className="font-semibold">{d.volunteerName}</span> assigned</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {!d.volunteerName && (
                    <Button variant="outline" size="sm" onClick={() => setAssignFor(d.id)}><UserPlus className="h-4 w-4" /> Assign</Button>
                  )}
                  {d.status !== 'delivered' && (
                    <Button size="sm" loading={update.isPending} onClick={() => update.mutate({ id: d.id, status: 'delivered' })}><Check className="h-4 w-4" /> Mark delivered</Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <Modal open={!!assignFor} onClose={() => setAssignFor(null)} title="Assign a volunteer">
        <div className="space-y-2">
          {MOCK_LEADERBOARD.slice(0, 5).map((v) => (
            <button
              key={v.userId}
              onClick={() => { if (assignFor) update.mutate({ id: assignFor, status: 'assigned' }); setAssignFor(null); }}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-3 text-left transition-colors hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-brand-950/40"
            >
              <Avatar src={v.avatar} name={v.name} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-bold">{v.name}</p>
                <p className="text-xs text-slate-400">{v.level} · {v.deliveries} deliveries</p>
              </div>
              <Bike className="h-5 w-5 text-brand-500" />
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
