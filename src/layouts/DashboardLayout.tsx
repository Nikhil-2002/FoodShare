import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, LogOut, Menu, Search, Sparkles, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useNotifStore } from '@/store/notifications';
import { NAV, ROLE_LABEL } from '@/config/navigation';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Badge } from '@/components/ui/Badge';
import { NotificationDrawer } from '@/components/shared/NotificationDrawer';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const { setOpen, unreadCount } = useNotifStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;
  const items = NAV[user.role];
  const unread = unreadCount();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Logo to={`/app/${user.role}`} />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/app/${user.role}`}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span layoutId="side-active" className="absolute inset-0 rounded-2xl bg-gradient-brand shadow-soft" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <item.icon className="relative z-10 h-5 w-5" />
                <span className="relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="m-3 rounded-2xl bg-gradient-to-br from-brand-500 to-emerald-700 p-4 text-white">
        <Sparkles className="h-5 w-5" />
        <p className="mt-2 text-sm font-bold">Make an impact today</p>
        <p className="mt-1 text-xs text-white/80">Every meal shared is a life touched.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-72 border-r border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-slate-900 lg:hidden"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-6 rounded-full p-1.5 text-slate-400">
                <X className="h-5 w-5" />
              </button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/70 bg-white/70 px-4 py-3.5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search donations, NGOs, volunteers…"
              className="w-full rounded-2xl border border-slate-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-slate-700 dark:bg-slate-800/60"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            <Link to="/app/profile" className="flex items-center gap-2 rounded-2xl py-1 pl-1 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-none">{user.name}</p>
                <Badge tone="brand" className="mt-1">{ROLE_LABEL[user.role]}</Badge>
              </div>
            </Link>
            <button onClick={onLogout} className="grid h-10 w-10 place-items-center rounded-2xl text-slate-500 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/40">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>

      <NotificationDrawer />
    </div>
  );
}
