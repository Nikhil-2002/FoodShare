import type { VolunteerLevel } from '@/types';

export interface LevelDef {
  name: VolunteerLevel;
  min: number;
  max: number;
  color: string;
  emoji: string;
}

export const LEVELS: LevelDef[] = [
  { name: 'Beginner', min: 0, max: 500, color: 'from-slate-400 to-slate-600', emoji: '🌱' },
  { name: 'Helper', min: 500, max: 1500, color: 'from-sky-400 to-blue-600', emoji: '🤝' },
  { name: 'Contributor', min: 1500, max: 3500, color: 'from-emerald-400 to-teal-600', emoji: '⭐' },
  { name: 'Hero', min: 3500, max: 6500, color: 'from-brand-500 to-emerald-700', emoji: '🦸' },
  { name: 'Champion', min: 6500, max: 9000, color: 'from-accent-400 to-amber-500', emoji: '🏆' },
  { name: 'Legend', min: 9000, max: Infinity, color: 'from-violet-500 to-fuchsia-600', emoji: '👑' },
];
