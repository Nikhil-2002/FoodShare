import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, HandHeart, Quote, Star, Utensils } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { FOOD_IMAGES } from '@/data/mock';

export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900 lg:block">
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo className="[&_span]:text-white [&_.gradient-text]:bg-none [&_.gradient-text]:text-accent-300" />

          <div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-extrabold leading-tight">
              Feed People,<br />Not Landfills.
            </motion.h1>
            <p className="mt-5 max-w-md text-white/80">Join a movement rescuing surplus food and serving communities — one meal at a time.</p>

            <div className="mt-10 flex gap-3">
              {[FOOD_IMAGES[3], FOOD_IMAGES[0], FOOD_IMAGES[1]].map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{ delay: 0.3 + i * 0.15, y: { duration: 4 + i, repeat: Infinity } }}
                  className="h-24 w-24 rounded-2xl object-cover shadow-2xl"
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm">
              {[{ icon: Utensils, l: 'Donate' }, { icon: HandHeart, l: 'Distribute' }, { icon: Bike, l: 'Deliver' }].map((x) => (
                <span key={x.l} className="flex items-center gap-2"><x.icon className="h-5 w-5 text-accent-300" /> {x.l}</span>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-5 text-white">
            <Quote className="h-6 w-6 text-accent-300" />
            <p className="mt-2 text-sm">“FoodShare transformed how we source meals. We now feed 3x more people.”</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-bold">Elena Morales</span>
              <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent-300 text-accent-300" />)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex items-center justify-center bg-gradient-mesh p-6 sm:p-12">
        <div className="absolute right-6 top-6"><ThemeToggle /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h2 className="font-display text-3xl font-extrabold">{title}</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export function AuthLink({ children, to }: { children: React.ReactNode; to: string }) {
  return <Link to={to} className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">{children}</Link>;
}
