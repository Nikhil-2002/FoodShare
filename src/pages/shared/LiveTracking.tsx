import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Navigation, Sparkles, Utensils } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Skeleton } from '@/components/ui/Skeleton';
import { StatusTimeline } from '@/components/shared/StatusTimeline';
import { TrackingMap, useRouteProgress } from '@/components/shared/TrackingMap';
import { useDonation, useTracking } from '@/api/queries';
import { countdown } from '@/lib/utils';

export default function LiveTracking() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: donation, isLoading } = useDonation(id);
  const { data: events = [] } = useTracking(id);
  const progress = useRouteProgress(18000);

  const pickup = donation?.pickupLocation ?? { lat: 37.7936, lng: -122.3965 };
  const delivery = donation?.deliveryLocation ?? { lat: 37.7649, lng: -122.4194 };
  const etaMin = Math.max(1, Math.round((1 - progress) * 18));

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <header className="glass-strong sticky top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Logo />
        </div>
        <ThemeToggle />
      </header>

      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Live Tracking</h1>
            <p className="text-slate-500">Follow your donation from kitchen to community.</p>
          </div>
          {donation && <Badge tone="warning"><Clock className="h-3 w-3" /> ETA {etaMin} min</Badge>}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-2">
              {isLoading ? <Skeleton className="h-[420px] rounded-3xl" /> : <TrackingMap pickup={pickup} delivery={delivery} progress={progress} />}
            </Card>
          </div>

          <div className="space-y-6">
            {isLoading || !donation ? (
              <Card><Skeleton className="h-32" /></Card>
            ) : (
              <Card>
                <img src={donation.images[0]} alt="" className="h-32 w-full rounded-2xl object-cover" />
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">{donation.title}</h3>
                  <StatusBadge status={donation.status} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Utensils className="h-4 w-4 text-brand-500" /> {donation.quantity} {donation.unit}</span>
                  <span className="flex items-center gap-1.5"><Navigation className="h-4 w-4 text-accent-500" /> {donation.distanceKm} km</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-rose-400" /> {countdown(donation.expiresAt)}</span>
                  <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-amber-500" /> +{donation.rewardPoints} pts</span>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Avatar src={donation.restaurantAvatar} name={donation.restaurantName} size="sm" />
                  <div>
                    <p className="text-sm font-bold">{donation.restaurantName}</p>
                    <p className="text-xs text-slate-400">{donation.ngoName ? `→ ${donation.ngoName}` : 'Awaiting NGO'}</p>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <h3 className="mb-4 font-display text-lg font-bold">Status Timeline</h3>
              {events.length ? <StatusTimeline events={events} /> : <Skeleton className="h-40" />}
            </Card>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/app/volunteer"><Button variant="ghost">Back to dashboard</Button></Link>
        </div>
      </div>
    </div>
  );
}
