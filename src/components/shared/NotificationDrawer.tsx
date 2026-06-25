import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Gift,
  HandHeart,
  PackageCheck,
  Bike,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useNotifStore } from '@/store/notifications';
import { timeAgo } from '@/lib/utils';
import type { NotificationType } from '@/types';

const ICONS: Record<NotificationType, { icon: typeof Bell; color: string }> = {
  new_donation: { icon: Gift, color: 'bg-brand-500' },
  ngo_accepted: { icon: HandHeart, color: 'bg-emerald-500' },
  volunteer_assigned: { icon: Bike, color: 'bg-sky-500' },
  pickup_started: { icon: Bike, color: 'bg-accent-500' },
  delivery_completed: { icon: PackageCheck, color: 'bg-emerald-600' },
  expiry_warning: { icon: AlertTriangle, color: 'bg-rose-500' },
};

export function NotificationDrawer() {
  const { notifications, open, setOpen, markAllRead, markRead } = useNotifStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="glass-strong fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 p-5 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-500" />
                <h2 className="font-display text-lg font-bold">Notifications</h2>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={markAllRead} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/40">
                  <CheckCheck className="h-4 w-4" /> Mark all read
                </button>
                <button onClick={() => setOpen(false)} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {notifications.map((n, i) => {
                const { icon: Icon, color } = ICONS[n.type];
                return (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => markRead(n.id)}
                    className={`flex w-full gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                      n.read
                        ? 'border-transparent bg-transparent'
                        : 'border-brand-100 bg-brand-50/60 dark:border-brand-900/40 dark:bg-brand-950/30'
                    }`}
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white ${color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{timeAgo(n.time)}</p>
                    </div>
                    {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
