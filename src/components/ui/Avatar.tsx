import { cn, initials } from '@/lib/utils';

export function Avatar({
  src,
  name,
  size = 'md',
  ring,
  className,
}: {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
  className?: string;
}) {
  const sizes = { xs: 'h-7 w-7 text-[10px]', sm: 'h-9 w-9 text-xs', md: 'h-11 w-11 text-sm', lg: 'h-16 w-16 text-lg', xl: 'h-24 w-24 text-2xl' };
  return src ? (
    <img
      src={src}
      alt={name}
      className={cn('rounded-full object-cover', sizes[size], ring && 'ring-2 ring-brand-400 ring-offset-2 dark:ring-offset-slate-950', className)}
    />
  ) : (
    <div
      className={cn(
        'grid place-items-center rounded-full bg-gradient-brand font-bold text-white',
        sizes[size],
        ring && 'ring-2 ring-brand-400 ring-offset-2',
        className
      )}
    >
      {initials(name)}
    </div>
  );
}
