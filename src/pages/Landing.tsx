import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  Bike,
  Building2,
  ChevronDown,
  HandHeart,
  Leaf,
  PackageCheck,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { MOCK_IMPACT, MOCK_TESTIMONIALS, FOOD_IMAGES } from '@/data/mock';
import { TestimonialSlider } from '@/components/shared/TestimonialSlider';

/* ---------------- Particle background ---------------- */
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => {
    const r = ((i * 73) % 100) / 100;
    return { id: i, left: `${(i * 53) % 100}%`, size: 6 + r * 14, delay: r * 5, dur: 8 + r * 8 };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-brand-400/30 blur-[1px] dark:bg-brand-500/20"
          style={{ left: d.left, width: d.size, height: d.size, top: '110%' }}
          animate={{ top: '-10%', opacity: [0, 1, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

/* ---------------- Floating food cards ---------------- */
function FloatingCard({ img, label, className, delay }: { img: string; label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
      className={`absolute hidden lg:block ${className}`}
    >
      <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }} className="glass-strong w-44 rounded-3xl p-2 shadow-card">
        <img src={img} alt={label} className="h-24 w-full rounded-2xl object-cover" />
        <div className="flex items-center gap-1.5 px-1 py-2">
          <Utensils className="h-3.5 w-3.5 text-brand-500" />
          <span className="text-xs font-semibold">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <Particles />
      <FloatingCard img={FOOD_IMAGES[1]} label="30 Pizzas saved" className="left-[4%] top-40" delay={0.4} />
      <FloatingCard img={FOOD_IMAGES[0]} label="45 Fresh meals" className="right-[5%] top-32" delay={0.7} />
      <FloatingCard img={FOOD_IMAGES[2]} label="60 Bakery items" className="left-[8%] bottom-10" delay={1} />
      <FloatingCard img={FOOD_IMAGES[4]} label="80kg Produce" className="right-[7%] bottom-4" delay={1.3} />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 backdrop-blur dark:border-brand-800 dark:bg-slate-900/50 dark:text-brand-300">
          <Sparkles className="h-4 w-4" /> 1.2M+ meals rescued and counting
        </motion.div>

        <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="block">
            Feed People,
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="gradient-text block bg-[length:200%_auto] animate-gradient-x">
            Not Landfills
          </motion.span>
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Every day thousands of meals are wasted while millions go hungry. FoodShare connects restaurants, NGOs, and volunteers to save food and serve communities.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/register?role=restaurant"><Button size="lg"><Utensils className="h-5 w-5" /> Donate Food</Button></Link>
          <Link to="/register?role=volunteer"><Button size="lg" variant="warm"><Bike className="h-5 w-5" /> Become Volunteer</Button></Link>
          <Link to="/register?role=ngo"><Button size="lg" variant="outline"><HandHeart className="h-5 w-5" /> Join as NGO</Button></Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-14 grid grid-cols-3 gap-4">
          {[
            { value: MOCK_IMPACT.mealsSaved, label: 'Meals Saved', suffix: '+' },
            { value: MOCK_IMPACT.volunteers, label: 'Volunteers', suffix: '+' },
            { value: MOCK_IMPACT.co2Prevented, label: 'kg CO₂ Saved', suffix: '+' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4">
              <div className="font-display text-2xl font-extrabold gradient-text sm:text-3xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    { icon: Utensils, value: MOCK_IMPACT.mealsSaved, label: 'Meals Saved', g: 'from-brand-500 to-emerald-700' },
    { icon: Building2, value: MOCK_IMPACT.restaurants, label: 'Restaurants Joined', g: 'from-accent-400 to-amber-500' },
    { icon: HandHeart, value: MOCK_IMPACT.ngos, label: 'NGOs Connected', g: 'from-emerald-400 to-teal-600' },
    { icon: Bike, value: MOCK_IMPACT.volunteers, label: 'Volunteers Active', g: 'from-violet-400 to-purple-600' },
    { icon: Leaf, value: MOCK_IMPACT.co2Prevented, label: 'kg CO₂ Prevented', g: 'from-green-400 to-emerald-600' },
  ];
  return (
    <section id="impact" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="text-center">
        <span className="gradient-text-warm text-sm font-bold uppercase tracking-widest">Real Impact</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Numbers that nourish</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">Live metrics from our global community of food heroes.</p>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="card group h-full text-center">
              <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.g} text-white shadow-soft transition-transform group-hover:scale-110`}>
                <s.icon className="h-7 w-7" />
              </div>
              <div className="font-display text-3xl font-extrabold text-slate-800 dark:text-white"><AnimatedCounter value={s.value} suffix="+" /></div>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Utensils, title: 'Restaurant posts food donation', desc: 'A few taps to list surplus food with photos, quantity and pickup window.', color: 'from-brand-500 to-emerald-700' },
    { icon: Bell, title: 'Nearby NGOs receive alerts', desc: 'Smart matching notifies the closest verified NGOs in real time.', color: 'from-accent-400 to-amber-500' },
    { icon: Bike, title: 'Volunteer accepts pickup', desc: 'Volunteers grab a nearby ride and earn reward points for every trip.', color: 'from-violet-400 to-purple-600' },
    { icon: PackageCheck, title: 'Food delivered successfully', desc: 'Live tracking confirms delivery — meals served, waste prevented.', color: 'from-emerald-400 to-teal-600' },
  ];
  return (
    <section id="how" className="bg-white/50 py-24 dark:bg-slate-900/30">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <span className="gradient-text text-sm font-bold uppercase tracking-widest">Simple Flow</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">How FoodShare works</h2>
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand-400 to-accent-400 md:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative flex gap-5">
                  <div className={`relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-glow`}>
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div className="card flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Step {i + 1}</span>
                    <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-slate-500 dark:text-slate-400">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" className="py-24">
      <Reveal className="mx-auto max-w-7xl px-6 text-center">
        <span className="gradient-text-warm text-sm font-bold uppercase tracking-widest">Success Stories</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Loved by our community</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">Hear from the restaurants, NGOs and volunteers making it happen.</p>
      </Reveal>
      <Reveal className="mt-14" y={20}>
        <TestimonialSlider items={MOCK_TESTIMONIALS} />
      </Reveal>
    </section>
  );
}

const FAQS = [
  { q: 'Is FoodShare free to use?', a: 'Yes! FoodShare is completely free for restaurants, NGOs, and volunteers. Our mission is impact, not profit.' },
  { q: 'How do you ensure food safety?', a: 'Donors specify preparation and expiry times, allergens, and storage. NGOs and volunteers see this before accepting, and our verification process vets all organizations.' },
  { q: 'How do volunteers earn rewards?', a: 'Volunteers earn points for every successful pickup and delivery, unlock badges, level up from Beginner to Legend, and climb the global leaderboard.' },
  { q: 'Which areas do you serve?', a: 'FoodShare is expanding rapidly across major cities. Sign up and we’ll match you with the nearest restaurants and NGOs.' },
  { q: 'Can my organization join?', a: 'Absolutely. Register as an NGO or restaurant and complete our quick verification to start rescuing food today.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white/50 py-24 dark:bg-slate-900/30">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <span className="gradient-text text-sm font-bold uppercase tracking-widest">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Questions, answered</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="card overflow-hidden p-0">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="font-display font-bold">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-brand-500" /></motion.span>
                </button>
                <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-12 text-center text-white sm:p-20">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-accent-400/30 blur-3xl" />
          <Leaf className="mx-auto h-12 w-12" />
          <h2 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Ready to make a difference?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">Join thousands turning surplus into meals. Your impact starts with a single click.</p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg" variant="warm" className="shadow-2xl">Get Started Free <ArrowRight className="h-5 w-5" /></Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <Hero />
      <Impact />
      <HowItWorks />
      <Stories />
      <FAQ />
      <CTA />
    </>
  );
}
