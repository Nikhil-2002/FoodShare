import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <motion.div
        whileHover={{ rotate: -12, scale: 1.08 }}
        className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand shadow-soft"
      >
        <Leaf className="h-5 w-5 text-white" />
      </motion.div>
      <span className="font-display text-xl font-extrabold tracking-tight">
        Food<span className="gradient-text">Share</span>
      </span>
    </Link>
  );
}
