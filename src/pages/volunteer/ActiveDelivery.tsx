import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusTimeline } from '@/components/shared/StatusTimeline';
import { TrackingMap, useRouteProgress } from '@/components/shared/TrackingMap';
import { useDonations, useTracking, useUpdateStatus } from '@/api/queries';

export default function ActiveDelivery() {
  const { data: donations = [] } = useDonations();
  const update = useUpdateStatus();
  const active = useMemo(
    () => donations.find((d) => ['picked_up', 'on_the_way', 'assigned'].includes(d.status) && d.deliveryLocation),
    [donations]
  );
  const { data: events = [] } = useTracking(active?.id ?? '');
  const progress = useRouteProgress(16000);

  if (!active || !active.deliveryLocation) {
    return (
      <>
        <PageHeader title="Active Delivery" subtitle="Track your live route in real time." />
        <EmptyState icon={Navigation} title="No active delivery" description="Accept a pickup to start a live, tracked delivery." action={<Link to="/app/volunteer/pickups"><Button>Find pickups</Button></Link>} />
      </>
    );
  }

  const etaMin = Math.max(1, Math.round((1 - progress) * 18));

  return (
    <>
      <PageHeader title="Active Delivery" subtitle={active.title} action={<Badge tone="warning"><Clock className="h-3 w-3" /> ETA {etaMin} min</Badge>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-2">
            <TrackingMap pickup={active.pickupLocation} delivery={active.deliveryLocation} progress={progress} />
          </Card>
          <Card className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Delivery progress</h3>
              <span className="text-sm font-bold text-brand-600">{Math.round(progress * 100)}%</span>
            </div>
            <ProgressBar value={progress * 100} />
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-brand-50 p-3 dark:bg-brand-950/40">
                <p className="flex items-center gap-1.5 font-semibold text-brand-700 dark:text-brand-300"><MapPin className="h-4 w-4" /> Pickup</p>
                <p className="mt-1 text-slate-500">{active.pickupAddress}</p>
              </div>
              <div className="rounded-2xl bg-accent-50 p-3 dark:bg-accent-950/40">
                <p className="flex items-center gap-1.5 font-semibold text-accent-700 dark:text-accent-300"><MapPin className="h-4 w-4" /> Deliver</p>
                <p className="mt-1 text-slate-500">{active.deliveryAddress}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-display text-lg font-bold">Status</h3>
            <StatusTimeline events={events} />
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <Avatar src={active.restaurantAvatar} name={active.restaurantName} size="md" />
              <div className="flex-1">
                <p className="font-bold">{active.restaurantName}</p>
                <p className="text-xs text-slate-400">Donor</p>
              </div>
              <Button variant="secondary" size="sm"><Phone className="h-4 w-4" /></Button>
            </div>
          </Card>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Button fullWidth size="lg" loading={update.isPending} onClick={() => update.mutate({ id: active.id, status: 'delivered' })}>
              <CheckCircle2 className="h-5 w-5" /> Mark as Delivered
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
