import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Salad } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-mesh p-6 text-center">
      <div>
        <motion.div animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-brand text-white shadow-glow">
          <Salad className="h-14 w-14" />
        </motion.div>
        <h1 className="mt-8 font-display text-7xl font-extrabold gradient-text">404</h1>
        <p className="mt-2 text-lg font-semibold">This plate is empty</p>
        <p className="mt-1 text-slate-500">The page you’re looking for has been served elsewhere.</p>
        <Link to="/" className="mt-6 inline-block"><Button size="lg"><Home className="h-5 w-5" /> Back home</Button></Link>
      </div>
    </div>
  );
}
