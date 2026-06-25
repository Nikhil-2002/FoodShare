import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ImagePlus, MapPin, PartyPopper, Trash2, UploadCloud } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Confetti } from '@/components/ui/Confetti';
import { Badge } from '@/components/ui/Badge';
import { useCreateDonation } from '@/api/queries';
import { FOOD_IMAGES } from '@/data/mock';
import type { FoodCategory } from '@/types';
import { cn } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(3, 'Give it a descriptive name'),
  category: z.string().min(1, 'Pick a category'),
  quantity: z.coerce.number().min(1, 'At least 1'),
  unit: z.string().min(1),
  pickupAddress: z.string().min(5, 'Enter a pickup address'),
  preparedAt: z.string().min(1, 'Required'),
  expiresAt: z.string().min(1, 'Required'),
  notes: z.string().optional(),
});
type Form = z.infer<typeof schema>;

const CATEGORIES: FoodCategory[] = ['Cooked Meals', 'Bakery', 'Fruits & Vegetables', 'Dairy', 'Packaged', 'Beverages', 'Grains'];
const ALLERGENS = ['Gluten', 'Dairy', 'Nuts', 'Eggs', 'Soy', 'Shellfish'];

export default function CreateDonation() {
  const navigate = useNavigate();
  const create = useCreateDonation();
  const [images, setImages] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { unit: 'meals', category: 'Cooked Meals' },
  });

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, 5));
  }, []);

  // Demo helper: add a sample photo without needing a real file.
  const addSample = () => setImages((prev) => [...prev, FOOD_IMAGES[prev.length % FOOD_IMAGES.length]].slice(0, 5));

  const onSubmit = async (data: Form) => {
    await create.mutateAsync({
      title: data.title,
      category: data.category as FoodCategory,
      quantity: data.quantity,
      unit: data.unit,
      images: images.length ? images : [FOOD_IMAGES[0]],
      pickupAddress: data.pickupAddress,
      preparedAt: new Date(data.preparedAt).toISOString(),
      expiresAt: new Date(data.expiresAt).toISOString(),
      allergens,
      notes: data.notes,
    });
    setSuccess(true);
    setTimeout(() => navigate('/app/restaurant/donations'), 2600);
  };

  return (
    <>
      <Confetti show={success} />
      <PageHeader title="Create a Donation" subtitle="List surplus food — it takes less than a minute." />

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg">
            <Card className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h2 className="mt-5 flex items-center justify-center gap-2 font-display text-2xl font-extrabold">Donation posted! <PartyPopper className="h-6 w-6 text-accent-500" /></h2>
              <p className="mt-2 text-slate-500">Nearby NGOs are being notified right now. Redirecting…</p>
            </Card>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <h3 className="mb-4 font-display text-lg font-bold">Food Details</h3>
                <div className="space-y-4">
                  <Input label="Food name" placeholder="e.g. Surplus Lunch Buffet" error={errors.title?.message} {...register('title')} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Select label="Category" error={errors.category?.message} {...register('category')}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </Select>
                    <Input label="Quantity" type="number" placeholder="45" error={errors.quantity?.message} {...register('quantity')} />
                    <Select label="Unit" {...register('unit')}>
                      {['meals', 'items', 'kg', 'boxes', 'pizzas', 'liters'].map((u) => <option key={u}>{u}</option>)}
                    </Select>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="mb-4 font-display text-lg font-bold">Photos</h3>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                  className={cn('relative grid place-items-center rounded-3xl border-2 border-dashed p-8 text-center transition-colors', dragging ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40' : 'border-slate-200 dark:border-slate-700')}
                >
                  <motion.div animate={{ y: dragging ? -6 : 0 }} className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
                    <UploadCloud className="h-7 w-7" />
                  </motion.div>
                  <p className="mt-3 text-sm font-semibold">Drag & drop images here</p>
                  <p className="text-xs text-slate-400">PNG, JPG up to 5 images</p>
                  <div className="mt-4 flex gap-2">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                      <span className="btn-base bg-slate-100 px-4 py-2 text-sm font-semibold dark:bg-slate-800"><ImagePlus className="h-4 w-4" /> Browse</span>
                    </label>
                    <Button type="button" variant="ghost" size="sm" onClick={addSample}>Add sample photo</Button>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {images.map((img, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="group relative aspect-square overflow-hidden rounded-2xl">
                        <img src={img} alt="" className="h-full w-full object-cover" />
                        <button type="button" onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))} className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Trash2 className="h-5 w-5 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <h3 className="mb-4 font-display text-lg font-bold">Pickup & Timing</h3>
                <div className="space-y-4">
                  <Input label="Pickup address" placeholder="221 Market St, San Francisco" icon={<MapPin className="h-4 w-4" />} error={errors.pickupAddress?.message} {...register('pickupAddress')} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Prepared at" type="datetime-local" error={errors.preparedAt?.message} {...register('preparedAt')} />
                    <Input label="Best before" type="datetime-local" error={errors.expiresAt?.message} {...register('expiresAt')} />
                  </div>
                  <Textarea label="Notes (optional)" placeholder="Packed in insulated trays, ready at the back entrance." {...register('notes')} />
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <h3 className="mb-3 font-display text-lg font-bold">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map((a) => {
                    const on = allergens.includes(a);
                    return (
                      <button key={a} type="button" onClick={() => setAllergens((p) => (on ? p.filter((x) => x !== a) : [...p, a]))} className={cn('rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-all', on ? 'border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300' : 'border-slate-200 text-slate-500 dark:border-slate-700')}>
                        {a}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-brand-500 to-emerald-700 text-white">
                <Badge tone="warm" className="bg-white/20 text-white">Tip</Badge>
                <p className="mt-3 text-sm">Clear photos and accurate quantities help NGOs accept your donation up to 3x faster.</p>
              </Card>

              <Button type="submit" fullWidth size="lg" loading={create.isPending}>Post Donation</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}
