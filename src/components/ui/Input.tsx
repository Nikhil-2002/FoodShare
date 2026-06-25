import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseField =
  'w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent';

interface FieldWrap {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & FieldWrap>(
  ({ label, error, hint, icon, className, ...props }, ref) => (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          ref={ref}
          className={cn(baseField, icon && 'pl-11', error && 'border-rose-400 focus:ring-rose-400', className)}
          {...props}
        />
      </div>
      {error ? (
        <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-slate-400">{hint}</span>
      ) : null}
    </label>
  )
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrap>(
  ({ label, error, className, ...props }, ref) => (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <textarea ref={ref} className={cn(baseField, 'min-h-[96px] resize-y', error && 'border-rose-400', className)} {...props} />
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  )
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & FieldWrap>(
  ({ label, error, icon, className, children, ...props }, ref) => (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <select ref={ref} className={cn(baseField, 'appearance-none cursor-pointer', icon && 'pl-11', error && 'border-rose-400', className)} {...props}>
          {children}
        </select>
      </div>
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  )
);
Select.displayName = 'Select';
