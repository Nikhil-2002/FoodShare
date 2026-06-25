import { motion } from 'framer-motion';
import { Clock, MapPin, Navigation, Sparkles, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Donation } from '@/types';
import { countdown } from '@/lib/utils';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function DonationCard({
  donation,
  action,
  delay = 0,
}: {
  donation: Donation;
  action?: { label: string; onClick: () => void; loading?: boolean };
  delay?: number;
}) {
  const expiring = new Date(donation.expiresAt).getTime() - Date.now() < 60 * 60000;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 110 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden p-0"
    >
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={donation.images[0] ?? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=70'}
          alt={donation.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-3 top-3"><StatusBadge status={donation.status} /></div>
        <div className="absolute right-3 top-3">
          <Badge tone={expiring ? 'danger' : 'warning'} className="backdrop-blur">
            <Clock className="h-3 w-3" /> {countdown(donation.expiresAt)}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
          <Avatar src={donation.restaurantAvatar} name={donation.restaurantName} size="xs" />
          <span className="text-xs font-medium drop-shadow">{donation.restaurantName}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight text-slate-800 dark:text-white">{donation.title}</h3>
          <Badge tone="brand">{donation.category}</Badge>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5"><Utensils className="h-4 w-4 text-brand-500" /> {donation.quantity} {donation.unit}</span>
          <span className="flex items-center gap-1.5"><Navigation className="h-4 w-4 text-accent-500" /> {donation.distanceKm} km away</span>
          <span className="col-span-2 flex items-center gap-1.5 truncate"><MapPin className="h-4 w-4 text-rose-400" /> {donation.pickupAddress}</span>
        </div>

        {donation.allergens.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {donation.allergens.map((a) => (
              <span key={a} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">{a}</span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm font-bold text-accent-500">
            <Sparkles className="h-4 w-4" /> +{donation.rewardPoints} pts
          </span>
          <div className="flex gap-2">
            <Link to={`/track/${donation.id}`}>
              <Button variant="ghost" size="sm">Track</Button>
            </Link>
            {action && (
              <Button size="sm" loading={action.loading} onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
