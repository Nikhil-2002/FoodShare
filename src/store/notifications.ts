import { create } from 'zustand';
import type { AppNotification } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/data/mock';

interface NotifState {
  notifications: AppNotification[];
  open: boolean;
  setOpen: (v: boolean) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  push: (n: AppNotification) => void;
  unreadCount: () => number;
}

export const useNotifStore = create<NotifState>((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,
  open: false,
  setOpen: (v) => set({ open: v }),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  push: (n) => set((s) => ({ notifications: [n, ...s.notifications] })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
