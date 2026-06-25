import { delay } from '@/lib/utils';
import {
  MOCK_BADGES,
  MOCK_COMMUNITY,
  MOCK_DONATIONS,
  MOCK_IMPACT,
  MOCK_LEADERBOARD,
  MOCK_TESTIMONIALS,
} from '@/data/mock';
import type {
  Badge,
  CommunityPost,
  Donation,
  DonationStatus,
  ImpactMetrics,
  LeaderboardEntry,
  Testimonial,
  TrackingEvent,
} from '@/types';

// In-memory mutable store so created donations persist for the session.
let donations: Donation[] = [...MOCK_DONATIONS];

export const api = {
  async getDonations(filter?: { status?: DonationStatus }): Promise<Donation[]> {
    await delay(500);
    if (filter?.status) return donations.filter((d) => d.status === filter.status);
    return [...donations];
  },

  async getDonation(id: string): Promise<Donation | undefined> {
    await delay(350);
    return donations.find((d) => d.id === id);
  },

  async createDonation(input: Partial<Donation>): Promise<Donation> {
    await delay(900);
    const donation: Donation = {
      id: `d-${Date.now()}`,
      title: input.title ?? 'Untitled Donation',
      category: input.category ?? 'Cooked Meals',
      quantity: input.quantity ?? 1,
      unit: input.unit ?? 'meals',
      images: input.images?.length ? input.images : [],
      status: 'active',
      restaurantId: 'u-rest-1',
      restaurantName: 'Green Fork Bistro',
      restaurantAvatar: 'https://i.pravatar.cc/150?img=12',
      pickupAddress: input.pickupAddress ?? '221 Market St, San Francisco',
      pickupLocation: input.pickupLocation ?? { lat: 37.7936, lng: -122.3965 },
      distanceKm: Number((Math.abs(2 + (input.quantity ?? 1) / 30)).toFixed(1)),
      preparedAt: input.preparedAt ?? new Date().toISOString(),
      expiresAt: input.expiresAt ?? new Date(Date.now() + 3 * 3600_000).toISOString(),
      allergens: input.allergens ?? [],
      notes: input.notes,
      rewardPoints: Math.round((input.quantity ?? 1) * 2.5),
      createdAt: new Date().toISOString(),
    };
    donations = [donation, ...donations];
    return donation;
  },

  async updateDonationStatus(id: string, status: DonationStatus): Promise<Donation> {
    await delay(500);
    donations = donations.map((d) => (d.id === id ? { ...d, status } : d));
    return donations.find((d) => d.id === id)!;
  },

  async getImpact(): Promise<ImpactMetrics> {
    await delay(400);
    return MOCK_IMPACT;
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    await delay(450);
    return MOCK_LEADERBOARD;
  },

  async getBadges(): Promise<Badge[]> {
    await delay(350);
    return MOCK_BADGES;
  },

  async getTestimonials(): Promise<Testimonial[]> {
    await delay(300);
    return MOCK_TESTIMONIALS;
  },

  async getCommunity(): Promise<CommunityPost[]> {
    await delay(400);
    return MOCK_COMMUNITY;
  },

  async getTracking(id: string): Promise<TrackingEvent[]> {
    await delay(400);
    const d = donations.find((x) => x.id === id);
    const order: TrackingEvent[] = [
      { stage: 'created', label: 'Donation Created', time: d?.createdAt ?? null, done: true },
      { stage: 'accepted', label: 'NGO Accepted', time: null, done: false },
      { stage: 'pickup_started', label: 'Pickup Started', time: null, done: false },
      { stage: 'picked_up', label: 'Picked Up', time: null, done: false },
      { stage: 'on_the_way', label: 'On The Way', time: null, done: false },
      { stage: 'delivered', label: 'Delivered', time: null, done: false },
    ];
    const statusToIndex: Record<DonationStatus, number> = {
      pending: 0, active: 0, assigned: 2, picked_up: 3, on_the_way: 4, delivered: 5, expired: 1,
    };
    const reached = statusToIndex[d?.status ?? 'active'];
    return order.map((e, i) => ({
      ...e,
      done: i <= reached,
      time: i <= reached ? new Date(Date.now() - (reached - i) * 18 * 60000).toISOString() : null,
    }));
  },
};
