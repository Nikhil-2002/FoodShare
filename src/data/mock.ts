import type {
  AppNotification,
  Badge,
  CommunityPost,
  Donation,
  ImpactMetrics,
  LeaderboardEntry,
  Testimonial,
  User,
  ChartPoint,
} from '@/types';

// ---------- Image helpers (Unsplash / pravatar — royalty free) ----------
const food = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const avatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`;

export const FOOD_IMAGES = [
  food('photo-1546069901-ba9599a7e63c'), // salad bowl
  food('photo-1565299624946-b28f40a0ae38'), // pizza
  food('photo-1567620905732-2d1ec7ab7445'), // pancakes
  food('photo-1504674900247-0877df9cc836'), // plated food
  food('photo-1490645935967-10de6ba17061'), // healthy bowl
  food('photo-1473093295043-cdd812d0e601'), // pasta
  food('photo-1568901346375-23c9450c58cd'), // burger
  food('photo-1551782450-a2132b4ba21d'), // sandwich
];

export const MOCK_USERS: Record<string, User> = {
  restaurant: {
    id: 'u-rest-1',
    name: 'Green Fork Bistro',
    email: 'restaurant@foodshare.app',
    role: 'restaurant',
    avatar: avatar(12),
    organization: 'Green Fork Bistro',
    phone: '+1 415 555 0142',
    address: '221 Market St, San Francisco',
    verified: true,
    createdAt: '2024-08-12T09:00:00Z',
    bio: 'Farm-to-table bistro committed to zero food waste.',
  },
  ngo: {
    id: 'u-ngo-1',
    name: 'Hope Kitchen',
    email: 'ngo@foodshare.app',
    role: 'ngo',
    avatar: avatar(32),
    organization: 'Hope Kitchen Foundation',
    phone: '+1 415 555 0188',
    address: '94 Mission Rd, San Francisco',
    verified: true,
    createdAt: '2024-05-02T09:00:00Z',
    bio: 'Serving 2,000+ hot meals every week to those in need.',
  },
  volunteer: {
    id: 'u-vol-1',
    name: 'Maya Chen',
    email: 'volunteer@foodshare.app',
    role: 'volunteer',
    avatar: avatar(45),
    phone: '+1 415 555 0199',
    address: 'San Francisco, CA',
    verified: true,
    createdAt: '2025-01-18T09:00:00Z',
    bio: 'Weekend warrior on a mission to end hunger, one ride at a time.',
    points: 4820,
    level: 'Hero',
  },
  admin: {
    id: 'u-admin-1',
    name: 'Alex Rivera',
    email: 'admin@foodshare.app',
    role: 'admin',
    avatar: avatar(60),
    organization: 'FoodShare HQ',
    verified: true,
    createdAt: '2024-01-01T09:00:00Z',
    bio: 'Platform operations & trust.',
  },
};

const now = Date.now();
const iso = (offsetMin: number) => new Date(now + offsetMin * 60000).toISOString();

export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'd-1',
    title: 'Surplus Lunch Buffet',
    category: 'Cooked Meals',
    quantity: 45,
    unit: 'meals',
    images: [FOOD_IMAGES[3], FOOD_IMAGES[4]],
    status: 'active',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    distanceKm: 2.4,
    preparedAt: iso(-90),
    expiresAt: iso(150),
    allergens: ['Gluten', 'Dairy'],
    notes: 'Packed in insulated trays, ready at the back entrance.',
    rewardPoints: 120,
    createdAt: iso(-30),
  },
  {
    id: 'd-2',
    title: 'Fresh Bakery Assortment',
    category: 'Bakery',
    quantity: 60,
    unit: 'items',
    images: [FOOD_IMAGES[2]],
    status: 'assigned',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    ngoId: 'u-ngo-1',
    ngoName: 'Hope Kitchen',
    volunteerId: 'u-vol-1',
    volunteerName: 'Maya Chen',
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    deliveryAddress: '94 Mission Rd, San Francisco',
    deliveryLocation: { lat: 37.7649, lng: -122.4194 },
    distanceKm: 3.1,
    preparedAt: iso(-200),
    expiresAt: iso(220),
    allergens: ['Gluten', 'Nuts'],
    rewardPoints: 95,
    createdAt: iso(-120),
  },
  {
    id: 'd-3',
    title: 'Organic Veg Crates',
    category: 'Fruits & Vegetables',
    quantity: 80,
    unit: 'kg',
    images: [FOOD_IMAGES[0]],
    status: 'on_the_way',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    ngoId: 'u-ngo-1',
    ngoName: 'Hope Kitchen',
    volunteerId: 'u-vol-1',
    volunteerName: 'Maya Chen',
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    deliveryAddress: '94 Mission Rd, San Francisco',
    deliveryLocation: { lat: 37.7649, lng: -122.4194 },
    distanceKm: 3.1,
    preparedAt: iso(-300),
    expiresAt: iso(400),
    allergens: [],
    rewardPoints: 140,
    createdAt: iso(-180),
  },
  {
    id: 'd-4',
    title: 'Wood-fired Pizzas',
    category: 'Cooked Meals',
    quantity: 30,
    unit: 'pizzas',
    images: [FOOD_IMAGES[1]],
    status: 'pending',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    distanceKm: 1.2,
    preparedAt: iso(-20),
    expiresAt: iso(90),
    allergens: ['Gluten', 'Dairy'],
    rewardPoints: 80,
    createdAt: iso(-15),
  },
  {
    id: 'd-5',
    title: 'Gourmet Sandwich Platters',
    category: 'Packaged',
    quantity: 50,
    unit: 'meals',
    images: [FOOD_IMAGES[7]],
    status: 'delivered',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    ngoId: 'u-ngo-1',
    ngoName: 'Hope Kitchen',
    volunteerId: 'u-vol-1',
    volunteerName: 'Maya Chen',
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    deliveryAddress: '94 Mission Rd, San Francisco',
    deliveryLocation: { lat: 37.7649, lng: -122.4194 },
    distanceKm: 3.1,
    preparedAt: iso(-1440),
    expiresAt: iso(-1200),
    allergens: ['Gluten'],
    rewardPoints: 110,
    createdAt: iso(-1500),
  },
  {
    id: 'd-6',
    title: 'Pasta & Salad Combo',
    category: 'Cooked Meals',
    quantity: 38,
    unit: 'meals',
    images: [FOOD_IMAGES[5]],
    status: 'expired',
    restaurantId: 'u-rest-1',
    restaurantName: 'Green Fork Bistro',
    restaurantAvatar: avatar(12),
    pickupAddress: '221 Market St, San Francisco',
    pickupLocation: { lat: 37.7936, lng: -122.3965 },
    distanceKm: 2.0,
    preparedAt: iso(-2880),
    expiresAt: iso(-60),
    allergens: ['Gluten', 'Dairy'],
    rewardPoints: 90,
    createdAt: iso(-3000),
  },
  {
    id: 'd-7',
    title: 'Breakfast Boxes',
    category: 'Packaged',
    quantity: 65,
    unit: 'boxes',
    images: [FOOD_IMAGES[6]],
    status: 'active',
    restaurantId: 'u-rest-2',
    restaurantName: 'Sunrise Cafe',
    restaurantAvatar: avatar(15),
    pickupAddress: '500 Howard St, San Francisco',
    pickupLocation: { lat: 37.7873, lng: -122.3964 },
    distanceKm: 4.6,
    preparedAt: iso(-45),
    expiresAt: iso(180),
    allergens: ['Eggs', 'Dairy'],
    rewardPoints: 130,
    createdAt: iso(-40),
  },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'First Delivery', description: 'Completed your very first delivery', icon: 'Truck', color: 'from-brand-400 to-brand-600', unlocked: true, unlockedAt: iso(-9000) },
  { id: 'b2', name: 'First Donation', description: 'Logged your first food donation', icon: 'Gift', color: 'from-accent-400 to-amber-500', unlocked: true, unlockedAt: iso(-8000) },
  { id: 'b3', name: 'Food Saver', description: 'Rescued 500+ meals', icon: 'Leaf', color: 'from-emerald-400 to-teal-600', unlocked: true, unlockedAt: iso(-4000) },
  { id: 'b4', name: 'Hunger Fighter', description: 'Helped feed 1,000 people', icon: 'HeartHandshake', color: 'from-rose-400 to-pink-600', unlocked: true, unlockedAt: iso(-2000) },
  { id: 'b5', name: 'Community Hero', description: 'Top 10 in your city', icon: 'Award', color: 'from-violet-400 to-purple-600', unlocked: false },
  { id: 'b6', name: 'Top Volunteer', description: 'Reached #1 on the leaderboard', icon: 'Crown', color: 'from-amber-400 to-yellow-500', unlocked: false },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: 'u-vol-9', name: 'Diego Santos', avatar: avatar(7), points: 9820, deliveries: 214, level: 'Legend', badges: 12 },
  { rank: 2, userId: 'u-vol-8', name: 'Aisha Khan', avatar: avatar(5), points: 8740, deliveries: 198, level: 'Champion', badges: 11 },
  { rank: 3, userId: 'u-vol-7', name: 'Liam O’Brien', avatar: avatar(13), points: 7610, deliveries: 176, level: 'Champion', badges: 9 },
  { rank: 4, userId: 'u-vol-1', name: 'Maya Chen', avatar: avatar(45), points: 4820, deliveries: 112, level: 'Hero', badges: 6 },
  { rank: 5, userId: 'u-vol-6', name: 'Sofia Rossi', avatar: avatar(20), points: 4310, deliveries: 101, level: 'Hero', badges: 6 },
  { rank: 6, userId: 'u-vol-5', name: 'Noah Williams', avatar: avatar(33), points: 3980, deliveries: 94, level: 'Contributor', badges: 5 },
  { rank: 7, userId: 'u-vol-4', name: 'Priya Patel', avatar: avatar(48), points: 3120, deliveries: 77, level: 'Contributor', badges: 4 },
  { rank: 8, userId: 'u-vol-3', name: 'Ethan Brown', avatar: avatar(51), points: 2450, deliveries: 61, level: 'Helper', badges: 3 },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', type: 'new_donation', title: 'New donation nearby', message: 'Green Fork Bistro posted 45 surplus meals 2.4km away.', time: iso(-5), read: false },
  { id: 'n2', type: 'volunteer_assigned', title: 'Volunteer assigned', message: 'Maya Chen accepted the bakery pickup.', time: iso(-40), read: false },
  { id: 'n3', type: 'pickup_started', title: 'Pickup started', message: 'Your veg crates are on the way to Hope Kitchen.', time: iso(-75), read: false },
  { id: 'n4', type: 'delivery_completed', title: 'Delivery completed 🎉', message: '50 sandwich platters delivered. +110 points!', time: iso(-180), read: true },
  { id: 'n5', type: 'expiry_warning', title: 'Expiry warning', message: 'Pasta & Salad Combo expires in 30 minutes.', time: iso(-200), read: true },
  { id: 'n6', type: 'ngo_accepted', title: 'NGO accepted', message: 'Hope Kitchen accepted your lunch buffet donation.', time: iso(-240), read: true },
];

export const MOCK_IMPACT: ImpactMetrics = {
  mealsSaved: 1284530,
  restaurants: 3420,
  ngos: 612,
  volunteers: 18940,
  co2Prevented: 642000,
  peopleHelped: 428000,
  deliveries: 96540,
  wasteReduced: 318000,
};

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Elena Morales', role: 'Director, Hope Kitchen', avatar: avatar(32), rating: 5, quote: 'FoodShare transformed how we source meals. We now feed 3x more people with zero extra staff.' },
  { id: 't2', name: 'Marcus Lee', role: 'Owner, Green Fork Bistro', avatar: avatar(12), rating: 5, quote: 'Instead of throwing surplus food away, we now see it nourish our community. The dashboard is gorgeous.' },
  { id: 't3', name: 'Maya Chen', role: 'Volunteer Hero', avatar: avatar(45), rating: 5, quote: 'The gamified pickups make volunteering addictive — in the best way. I’ve done 112 deliveries!' },
  { id: 't4', name: 'Dr. Anita Rao', role: 'Public Health Researcher', avatar: avatar(25), rating: 5, quote: 'A rare tech platform measuring real impact: meals, people, and CO₂ — all in one place.' },
];

export const MOCK_COMMUNITY: CommunityPost[] = [
  { id: 'c1', author: 'Hope Kitchen', authorRole: 'ngo', avatar: avatar(32), image: FOOD_IMAGES[4], category: 'Success Story', title: '2,000 meals served this weekend', body: 'Thanks to 14 restaurants and 40 volunteers, we served a record number of hot meals across three shelters.', likes: 342, comments: 28, time: iso(-300) },
  { id: 'c2', author: 'Maya Chen', authorRole: 'volunteer', avatar: avatar(45), image: FOOD_IMAGES[1], category: 'Volunteer Highlight', title: 'My 100th delivery!', body: 'Just hit a personal milestone. Every ride is a reminder that small actions add up to big change.', likes: 521, comments: 64, time: iso(-700) },
  { id: 'c3', author: 'Green Fork Bistro', authorRole: 'restaurant', avatar: avatar(12), image: FOOD_IMAGES[3], category: 'Food Rescue', title: 'Zero waste for 30 days straight', body: 'We routed 100% of our surplus to FoodShare this month. Proud of our kitchen team!', likes: 289, comments: 19, time: iso(-1400) },
  { id: 'c4', author: 'FoodShare', authorRole: 'admin', avatar: avatar(60), image: FOOD_IMAGES[0], category: 'NGO Spotlight', title: 'Spotlight: Sunrise Shelter', body: 'Meet the NGO turning rescued produce into 500 nutritious meals a day.', likes: 410, comments: 33, time: iso(-2200) },
];

// ----- Chart datasets -----
export const DONATION_TRENDS: ChartPoint[] = [
  { label: 'Mon', value: 12 }, { label: 'Tue', value: 19 }, { label: 'Wed', value: 14 },
  { label: 'Thu', value: 23 }, { label: 'Fri', value: 31 }, { label: 'Sat', value: 28 }, { label: 'Sun', value: 22 },
];

export const FOOD_CATEGORIES: ChartPoint[] = [
  { label: 'Cooked Meals', value: 42 }, { label: 'Bakery', value: 23 }, { label: 'Produce', value: 18 },
  { label: 'Packaged', value: 12 }, { label: 'Dairy', value: 5 },
];

export const MONTHLY_IMPACT: ChartPoint[] = [
  { label: 'Jan', value: 820, secondary: 410 }, { label: 'Feb', value: 1100, secondary: 560 },
  { label: 'Mar', value: 1340, secondary: 690 }, { label: 'Apr', value: 1180, secondary: 620 },
  { label: 'May', value: 1620, secondary: 880 }, { label: 'Jun', value: 1980, secondary: 1040 },
];

export const CATEGORY_COLORS = ['#10b981', '#fb923c', '#34d399', '#f59e0b', '#6ee7b7'];
