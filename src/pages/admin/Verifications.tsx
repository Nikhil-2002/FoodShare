import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, Mail, MapPin, ShieldCheck, X } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { VERIFICATIONS } from '@/data/adminMock';

export default function Verifications() {
  const [items, setItems] = useState(VERIFICATIONS);
  const decide = (id: string) => setItems((prev) => prev.filter((v) => v.id !== id));

  return (
    <>
      <PageHeader title="Verifications" subtitle="Review and approve restaurants & NGOs joining the platform." action={<Badge tone="warning">{items.length} pending</Badge>} />

      {items.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="All caught up!" description="No pending verifications right now." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {items.map((v, i) => (
              <motion.div key={v.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.06 }}>
                <Card>
                  <div className="flex items-center gap-3">
                    <Avatar src={v.avatar} name={v.name} size="md" ring />
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold">{v.name}</h3>
                      <Badge tone={v.type === 'NGO' ? 'info' : 'warm'}>{v.type}</Badge>
                    </div>
                    <span className="text-xs text-slate-400">{v.submitted}</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> {v.email}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent-500" /> {v.address}</p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {v.documents.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium dark:bg-slate-800"><FileText className="h-3.5 w-3.5 text-brand-500" /> {d}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button fullWidth onClick={() => decide(v.id)}><Check className="h-4 w-4" /> Approve</Button>
                    <Button variant="danger" onClick={() => decide(v.id)}><X className="h-4 w-4" /> Reject</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
