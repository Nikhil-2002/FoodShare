import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, hover, glass, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(glass ? 'glass rounded-3xl' : 'card', 'p-6', className)}
      whileHover={hover ? { y: -6, transition: { type: 'spring', stiffness: 300 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
