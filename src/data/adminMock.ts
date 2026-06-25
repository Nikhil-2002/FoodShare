import type { UserRole } from '@/types';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'pending' | 'suspended';
  joined: string;
  contributions: number;
}

const a = (n: number) => `https://i.pravatar.cc/150?img=${n}`;

export const ADMIN_USERS: AdminUser[] = [
  { id: '1', name: 'Green Fork Bistro', email: 'rest@foodshare.app', role: 'restaurant', avatar: a(12), status: 'active', joined: 'Aug 2024', contributions: 148 },
  { id: '2', name: 'Hope Kitchen', email: 'ngo@foodshare.app', role: 'ngo', avatar: a(32), status: 'active', joined: 'May 2024', contributions: 342 },
  { id: '3', name: 'Maya Chen', email: 'maya@foodshare.app', role: 'volunteer', avatar: a(45), status: 'active', joined: 'Jan 2025', contributions: 112 },
  { id: '4', name: 'Bella Italia', email: 'bella@food.com', role: 'restaurant', avatar: a(15), status: 'pending', joined: 'Jun 2026', contributions: 0 },
  { id: '5', name: 'Feed The City', email: 'feed@ngo.org', role: 'ngo', avatar: a(20), status: 'pending', joined: 'Jun 2026', contributions: 0 },
  { id: '6', name: 'Diego Santos', email: 'diego@foodshare.app', role: 'volunteer', avatar: a(7), status: 'active', joined: 'Feb 2024', contributions: 214 },
  { id: '7', name: 'Urban Eats', email: 'urban@eats.com', role: 'restaurant', avatar: a(33), status: 'suspended', joined: 'Mar 2025', contributions: 56 },
  { id: '8', name: 'Aisha Khan', email: 'aisha@foodshare.app', role: 'volunteer', avatar: a(5), status: 'active', joined: 'Apr 2024', contributions: 198 },
];

export interface VerificationItem {
  id: string;
  name: string;
  type: 'Restaurant' | 'NGO';
  avatar: string;
  email: string;
  address: string;
  submitted: string;
  documents: string[];
}

export const VERIFICATIONS: VerificationItem[] = [
  { id: 'v1', name: 'Bella Italia', type: 'Restaurant', avatar: a(15), email: 'bella@food.com', address: '12 Vine St, San Francisco', submitted: '2 days ago', documents: ['Business License', 'Food Safety Cert'] },
  { id: 'v2', name: 'Feed The City', type: 'NGO', avatar: a(20), email: 'feed@ngo.org', address: '88 Charity Ave, Oakland', submitted: '3 days ago', documents: ['501(c)(3)', 'Registration'] },
  { id: 'v3', name: 'Shelter Plus', type: 'NGO', avatar: a(25), email: 'hello@shelterplus.org', address: '5 Harbor Rd, San Francisco', submitted: '4 days ago', documents: ['Nonprofit Status'] },
  { id: 'v4', name: 'Urban Eats', type: 'Restaurant', avatar: a(33), email: 'urban@eats.com', address: '400 Folsom St, San Francisco', submitted: '5 days ago', documents: ['Business License', 'Insurance'] },
];
