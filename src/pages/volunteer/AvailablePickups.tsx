import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bike, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDonations, useUpdateStatus } from '@/api/queries';
import { countdown } from '@/lib/utils';

export default function AvailablePickups() {
  const { data: donations = [], isLoading } = useDonations();
  const update = useUpdateStatus();
  const navigate = useNavigate();
  const [accepting, setAccepting] = useState<string | null>(null);

  const available = donations.filter((d) => ['active', 'assigned'].includes(d.status));

  const accept = async (id: string) => {
    setAccepting(id);
    await update.mutateAsync({ id, status: 'picked_up' });
    navigate('/app/volunteer/active');
  };

  return (
    <>
      <PageHeader title="Available Pickups" subtitle="Grab a ride, earn points, feed your city." />

      {isLoading ? (
        <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : available.length === 0 ? (
        <EmptyState icon={Bike} title="No pickups right now" description="New rides appear here the moment a restaurant posts food." />
      ) : (
        <div className="space-y-4">
          {available.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.01 }}>
              <Card className="overflow-hidden p-0">
                <div className="flex flex-col md:flex-row">
                  <img src={d.images[0]} alt="" className="h-40 w-full object-cover md:h-auto md:w-48" />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold">{d.title}</h3>
                        <p className="flex items-center gap-1.5 text-sm text-slate-500"><Avatar src={d.restaurantAvatar} name={d.restaurantName} size="xs" /> {d.restaurantName}</p>
                      </div>
                      <Badge tone="warm"><Sparkles className="h-3 w-3" /> +{d.rewardPoints} pts</Badge>
                    </div>

                    {/* Route */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-950" />
                        <span className="my-1 h-8 w-0.5 border-l-2 border-dashed border-slate-300" />
                        <span className="h-3 w-3 rounded-full bg-accent-500 ring-4 ring-accent-100 dark:ring-accent-950" />
                      </div>
                      <div className="flex-1 space-y-3 text-sm">
                        <p className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand-500" /> <span className="font-semibold">Pickup:</span> {d.pickupAddress}</p>
                        <p className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent-500" /> <span className="font-semibold">Deliver:</span> {d.deliveryAddress ?? 'Hope Kitchen, Mission Rd'}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Navigation className="h-4 w-4 text-accent-500" /> {d.distanceKm} km</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-rose-400" /> {countdown(d.expiresAt)}</span>
                      </div>
                      <Button loading={accepting === d.id} onClick={() => accept(d.id)}>Accept Pickup <ArrowRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
