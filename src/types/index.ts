// ===== Core domain types for FoodShare =====

export type UserRole = 'restaurant' | 'ngo' | 'volunteer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization?: string;
  phone?: string;
  address?: string;
  verified: boolean;
  createdAt: string;
  bio?: string;
  // gamification (volunteers)
  points?: number;
  level?: VolunteerLevel;
}

export type VolunteerLevel =
  | 'Beginner'
  | 'Helper'
  | 'Contributor'
  | 'Hero'
  | 'Champion'
  | 'Legend';

export type DonationStatus =
  | 'pending'
  | 'active'
  | 'assigned'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'expired';

export type FoodCategory =
  | 'Cooked Meals'
  | 'Bakery'
  | 'Fruits & Vegetables'
  | 'Dairy'
  | 'Packaged'
  | 'Beverages'
  | 'Grains';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Donation {
  id: string;
  title: string;
  category: FoodCategory;
  quantity: number; // number of meals
  unit: string;
  images: string[];
  status: DonationStatus;
  restaurantId: string;
  restaurantName: string;
  restaurantAvatar: string;
  ngoId?: string;
  ngoName?: string;
  volunteerId?: string;
  volunteerName?: string;
  pickupAddress: string;
  pickupLocation: GeoPoint;
  deliveryLocation?: GeoPoint;
  deliveryAddress?: string;
  distanceKm: number;
  preparedAt: string;
  expiresAt: string;
  allergens: string[];
  notes?: string;
  rewardPoints: number;
  createdAt: string;
}

export type TrackingStage =
  | 'created'
  | 'accepted'
  | 'pickup_started'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered';

export interface TrackingEvent {
  stage: TrackingStage;
  label: string;
  time: string | null;
  done: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  points: number;
  deliveries: number;
  level: VolunteerLevel;
  badges: number;
}

export type NotificationType =
  | 'new_donation'
  | 'ngo_accepted'
  | 'volunteer_assigned'
  | 'pickup_started'
  | 'delivery_completed'
  | 'expiry_warning';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ImpactMetrics {
  mealsSaved: number;
  restaurants: number;
  ngos: number;
  volunteers: number;
  co2Prevented: number; // kg
  peopleHelped: number;
  deliveries: number;
  wasteReduced: number; // kg
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: UserRole;
  avatar: string;
  image: string;
  category: 'Success Story' | 'Food Rescue' | 'Volunteer Highlight' | 'NGO Spotlight';
  title: string;
  body: string;
  likes: number;
  comments: number;
  time: string;
}

export interface ChartPoint {
  label: string;
  value: number;
  secondary?: number;
}
