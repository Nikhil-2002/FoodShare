import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/auth';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Impact', href: '#impact' },
    { label: 'How it Works', href: '#how' },
    { label: 'Stories', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-strong py-2 shadow-soft' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <Button size="sm" onClick={() => navigate(`/app/${user.role}`)}>Dashboard</Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('/login')}>Log in</Button>
              <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

function Footer() {
  const cols = [
    { title: 'Platform', items: ['Donate Food', 'Become Volunteer', 'Join as NGO', 'Impact'] },
    { title: 'Company', items: ['About', 'Careers', 'Press', 'Contact'] },
    { title: 'Resources', items: ['Blog', 'Help Center', 'Guidelines', 'API'] },
  ];
  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Connecting surplus food with people who need it. Feed people, not landfills.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-brand-500 hover:text-white dark:bg-slate-800">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-bold text-slate-800 dark:text-white">{c.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.items.map((i) => (
                <li key={i}><a href="#" className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70 py-6 dark:border-slate-800">
        <p className="flex items-center justify-center gap-1.5 text-sm text-slate-400">
          Made with <Heart className="h-4 w-4 fill-rose-500 text-rose-500" /> by FoodShare · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
