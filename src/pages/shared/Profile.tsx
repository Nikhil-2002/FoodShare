import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Camera, CheckCircle2, Clock, Mail, MapPin, Phone, Save, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { useAuthStore } from '@/store/auth';
import { ROLE_LABEL } from '@/config/navigation';
import { MOCK_BADGES } from '@/data/mock';
import * as Icons from 'lucide-react';

const ACTIVITY = [
  { label: 'Delivered Pasta & Salad Combo', time: '2h ago', icon: CheckCircle2 },
  { label: 'Unlocked “Food Saver” badge', time: '1d ago', icon: Award },
  { label: 'Accepted Bakery Assortment pickup', time: '2d ago', icon: Clock },
  { label: 'Reached Hero level', time: '5d ago', icon: ShieldCheck },
];

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', phone: user?.phone ?? '', address: user?.address ?? '', bio: user?.bio ?? '' });

  if (!user) return null;
  const getIcon = (n: string) => (Icons as unknown as Record<string, Icons.LucideIcon>)[n] ?? Icons.Award;

  const onSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateProfile({ avatar: URL.createObjectURL(file) });
  };

  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your details, verification and achievements." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Identity card */}
        <Reveal>
          <Card className="text-center">
            <div className="relative mx-auto w-fit">
              <Avatar src={user.avatar} name={user.name} size="xl" ring />
              <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-white shadow-soft">
                <Camera className="h-4 w-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">{user.name}</h2>
            <div className="mt-1 flex items-center justify-center gap-2">
              <Badge tone="brand">{ROLE_LABEL[user.role]}</Badge>
              {user.verified ? (
                <Badge tone="success"><ShieldCheck className="h-3 w-3" /> Verified</Badge>
              ) : (
                <Badge tone="warning"><Clock className="h-3 w-3" /> Pending</Badge>
              )}
            </div>
            {user.organization && <p className="mt-2 text-sm text-slate-500">{user.organization}</p>}

            {user.role === 'volunteer' && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-50 p-3 dark:bg-brand-950/40">
                  <p className="font-display text-2xl font-extrabold text-brand-600">{user.points ?? 4820}</p>
                  <p className="text-xs text-slate-400">Points</p>
                </div>
                <div className="rounded-2xl bg-accent-50 p-3 dark:bg-accent-950/40">
                  <p className="font-display text-2xl font-extrabold text-accent-600">{user.level ?? 'Hero'}</p>
                  <p className="text-xs text-slate-400">Level</p>
                </div>
              </div>
            )}
          </Card>

          <Card className="mt-6">
            <h3 className="mb-4 font-display text-lg font-bold">Achievements</h3>
            <div className="grid grid-cols-4 gap-3">
              {MOCK_BADGES.filter((b) => b.unlocked).map((b) => {
                const Icon = getIcon(b.icon);
                return (
                  <motion.div key={b.id} whileHover={{ scale: 1.15, rotate: 8 }} title={b.name} className={`grid aspect-square place-items-center rounded-2xl bg-gradient-to-br text-white ${b.color}`}>
                    <Icon className="h-6 w-6" />
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </Reveal>

        {/* Editable details + activity */}
        <div className="space-y-6 lg:col-span-2">
          <Reveal delay={0.1}>
            <Card>
              <h3 className="mb-4 font-display text-lg font-bold">Edit details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Email" value={user.email} icon={<Mail className="h-4 w-4" />} disabled />
                <Input label="Phone" value={form.phone} icon={<Phone className="h-4 w-4" />} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input label="Address" value={form.address} icon={<MapPin className="h-4 w-4" />} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="mt-4"><Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div className="mt-5 flex justify-end">
                <Button onClick={onSave}>{saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save changes</>}</Button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card>
              <h3 className="mb-4 font-display text-lg font-bold">Activity history</h3>
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40"><a.icon className="h-5 w-5" /></span>
                    <p className="flex-1 text-sm font-medium">{a.label}</p>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </>
  );
}
