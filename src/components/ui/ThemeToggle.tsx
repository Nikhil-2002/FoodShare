import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/theme';

export function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  const dark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    >
      <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 250 }}>
        {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
