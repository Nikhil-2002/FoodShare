import { cn } from '@/lib/utils';
import type { DonationStatus } from '@/types';

type Tone = 'brand' | 'warm' | 'gray' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  warm: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  gray: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

export function Badge({
  children,
  tone = 'brand',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const statusMap: Record<DonationStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Pending', tone: 'gray' },
  active: { label: 'Active', tone: 'brand' },
  assigned: { label: 'Assigned', tone: 'info' },
  picked_up: { label: 'Picked Up', tone: 'warm' },
  on_the_way: { label: 'On The Way', tone: 'warning' },
  delivered: { label: 'Delivered', tone: 'success' },
  expired: { label: 'Expired', tone: 'danger' },
};

export function StatusBadge({ status }: { status: DonationStatus }) {
  const s = statusMap[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
