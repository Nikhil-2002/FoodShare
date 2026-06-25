import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { MOCK_USERS } from '@/data/mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => User;
  loginWithEmail: (email: string) => User;
  register: (data: { name: string; email: string; role: UserRole; organization?: string }) => User;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (role) => {
        const user = MOCK_USERS[role];
        set({ user, isAuthenticated: true });
        return user;
      },
      loginWithEmail: (email) => {
        const found =
          Object.values(MOCK_USERS).find((u) => u.email === email) ??
          MOCK_USERS.volunteer;
        set({ user: found, isAuthenticated: true });
        return found;
      },
      register: ({ name, email, role, organization }) => {
        const base = MOCK_USERS[role];
        const user: User = {
          ...base,
          id: `u-${role}-${Date.now()}`,
          name,
          email,
          organization: organization ?? base.organization,
          verified: role === 'volunteer',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return user;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (patch) => {
        const current = get().user;
        if (current) set({ user: { ...current, ...patch } });
      },
    }),
    { name: 'foodshare-auth' }
  )
);
