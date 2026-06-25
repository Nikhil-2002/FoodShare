import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const applyToDom = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggle: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        applyToDom(next);
        set({ theme: next });
      },
      setTheme: (t) => {
        applyToDom(t);
        set({ theme: t });
      },
    }),
    {
      name: 'foodshare-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyToDom(state.theme);
      },
    }
  )
);
