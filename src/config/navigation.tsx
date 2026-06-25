import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Package,
  Inbox,
  Bike,
  Trophy,
  Award,
  Map,
  Users,
  BarChart3,
  Heart,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import type { UserRole } from '@/types';

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
}

const common: NavItem[] = [
  { label: 'Leaderboard', to: '/app/leaderboard', icon: Trophy },
  { label: 'Impact', to: '/app/impact', icon: BarChart3 },
  { label: 'Community', to: '/app/community', icon: Heart },
  { label: 'Profile', to: '/app/profile', icon: Settings },
];

export const NAV: Record<UserRole, NavItem[]> = {
  restaurant: [
    { label: 'Dashboard', to: '/app/restaurant', icon: LayoutDashboard },
    { label: 'Create Donation', to: '/app/restaurant/create', icon: PlusCircle },
    { label: 'My Donations', to: '/app/restaurant/donations', icon: ClipboardList },
    ...common,
  ],
  ngo: [
    { label: 'Dashboard', to: '/app/ngo', icon: LayoutDashboard },
    { label: 'Available Food', to: '/app/ngo/available', icon: Package },
    { label: 'Requests', to: '/app/ngo/requests', icon: Inbox },
    ...common,
  ],
  volunteer: [
    { label: 'Dashboard', to: '/app/volunteer', icon: LayoutDashboard },
    { label: 'Available Pickups', to: '/app/volunteer/pickups', icon: Bike },
    { label: 'Achievements', to: '/app/volunteer/achievements', icon: Award },
    { label: 'Live Tracking', to: '/app/volunteer/active', icon: Map },
    ...common,
  ],
  admin: [
    { label: 'Overview', to: '/app/admin', icon: LayoutDashboard },
    { label: 'Users', to: '/app/admin/users', icon: Users },
    { label: 'Verifications', to: '/app/admin/verify', icon: ShieldCheck },
    { label: 'Donations', to: '/app/admin/donations', icon: Package },
    { label: 'Analytics', to: '/app/impact', icon: BarChart3 },
    { label: 'Settings', to: '/app/profile', icon: Settings },
  ],
};

export const ROLE_LABEL: Record<UserRole, string> = {
  restaurant: 'Restaurant',
  ngo: 'NGO',
  volunteer: 'Volunteer',
  admin: 'Admin',
};
