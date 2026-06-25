import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bike, Building2, CheckCircle2, HandHeart, Lock, Mail, ShieldCheck, User, Utensils } from 'lucide-react';
import { AuthShell, AuthLink } from './AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

const ROLES: { id: UserRole; label: string; icon: typeof Utensils }[] = [
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'ngo', label: 'NGO', icon: HandHeart },
  { id: 'volunteer', label: 'Volunteer', icon: Bike },
];

/* ============== LOGIN ============== */
const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
});
type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const loginWithEmail = useAuthStore((s) => s.loginWithEmail);
  const login = useAuthStore((s) => s.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    await new Promise((r) => setTimeout(r, 700));
    const user = loginWithEmail(data.email);
    navigate(`/app/${user.role}`);
  };

  const demo = (role: UserRole) => {
    const user = login(role);
    navigate(`/app/${user.role}`);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue rescuing food.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} error={errors.password?.message} {...register('password')} />
        <div className="flex justify-end"><AuthLink to="/forgot-password">Forgot password?</AuthLink></div>
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>Log in <ArrowRight className="h-4 w-4" /></Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /> Quick demo login <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(['restaurant', 'ngo', 'volunteer', 'admin'] as UserRole[]).map((r) => (
          <Button key={r} variant="secondary" size="sm" onClick={() => demo(r)} className="capitalize">{r}</Button>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">No account? <AuthLink to="/register">Create one</AuthLink></p>
    </AuthShell>
  );
}

/* ============== REGISTER ============== */
const registerSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  organization: z.string().optional(),
  password: z.string().min(6, 'At least 6 characters'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });
type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const [params] = useSearchParams();
  const initialRole = (params.get('role') as UserRole) ?? 'volunteer';
  const [role, setRole] = useState<UserRole>(ROLES.some((r) => r.id === initialRole) ? initialRole : 'volunteer');
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    await new Promise((r) => setTimeout(r, 800));
    registerUser({ name: data.name, email: data.email, role, organization: data.organization });
    navigate('/verify-otp');
  };

  return (
    <AuthShell title="Create your account" subtitle="Pick your role and join the movement.">
      <div className="mb-5 grid grid-cols-3 gap-2">
        {ROLES.map((r) => (
          <button key={r.id} type="button" onClick={() => setRole(r.id)} className={cn('flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 text-xs font-semibold transition-all', role === r.id ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300' : 'border-slate-200 text-slate-500 dark:border-slate-700')}>
            <r.icon className="h-5 w-5" /> {r.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full name" placeholder="Jane Doe" icon={<User className="h-4 w-4" />} error={errors.name?.message} {...register('name')} />
        {role !== 'volunteer' && (
          <Input label="Organization" placeholder="Acme Foods" icon={<Building2 className="h-4 w-4" />} error={errors.organization?.message} {...register('organization')} />
        )}
        <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
          <Input label="Confirm" type="password" placeholder="••••••••" error={errors.confirm?.message} {...register('confirm')} />
        </div>
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>Create account <ArrowRight className="h-4 w-4" /></Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already a member? <AuthLink to="/login">Log in</AuthLink></p>
    </AuthShell>
  );
}

/* ============== FORGOT PASSWORD ============== */
export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.string().email('Enter a valid email') })) });
  return (
    <AuthShell title="Forgot password?" subtitle="We’ll email you a secure reset link.">
      {sent ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border-2 border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-900 dark:bg-brand-950/40">
          <CheckCircle2 className="mx-auto h-12 w-12 text-brand-500" />
          <p className="mt-3 font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm text-slate-500">We’ve sent a reset link to your email.</p>
          <Link to="/reset-password" className="mt-5 inline-block"><Button>Continue to reset</Button></Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 600)); setSent(true); })} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
          <Button type="submit" fullWidth size="lg" loading={isSubmitting}>Send reset link</Button>
        </form>
      )}
      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft className="h-4 w-4" /> Back to login</Link>
    </AuthShell>
  );
}

/* ============== RESET PASSWORD ============== */
export function ResetPassword() {
  const navigate = useNavigate();
  const schema = z.object({ password: z.string().min(6, 'At least 6 characters'), confirm: z.string() }).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ password: string; confirm: string }>({ resolver: zodResolver(schema) });
  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you’ll remember.">
      <form onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 700)); navigate('/login'); })} className="space-y-4">
        <Input label="New password" type="password" icon={<Lock className="h-4 w-4" />} placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <Input label="Confirm password" type="password" icon={<Lock className="h-4 w-4" />} placeholder="••••••••" error={errors.confirm?.message} {...register('confirm')} />
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>Reset password</Button>
      </form>
    </AuthShell>
  );
}

/* ============== OTP VERIFICATION ============== */
export function OtpVerification() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const verify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    navigate(user ? `/app/${user.role}` : '/login');
  };

  const complete = digits.every((d) => d !== '');

  return (
    <AuthShell title="Verify your email" subtitle="Enter the 6-digit code we sent you. (Hint: any digits work)">
      <div className="mb-5 flex items-center gap-2 rounded-2xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
        <ShieldCheck className="h-5 w-5" /> A secure code keeps your account safe.
      </div>
      <div className="flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Backspace' && !d && i > 0) refs.current[i - 1]?.focus(); }}
            maxLength={1}
            inputMode="numeric"
            className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-white/80 text-center font-display text-2xl font-bold focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/60"
          />
        ))}
      </div>
      <Button onClick={verify} fullWidth size="lg" className="mt-6" loading={loading} disabled={!complete}>Verify & continue</Button>
      <p className="mt-6 text-center text-sm text-slate-500">Didn’t get a code? <button className="font-semibold text-brand-600">Resend</button></p>
    </AuthShell>
  );
}
