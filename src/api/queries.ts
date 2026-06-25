import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './mockApi';
import type { Donation, DonationStatus } from '@/types';

export const keys = {
  donations: (status?: DonationStatus) => ['donations', status ?? 'all'] as const,
  donation: (id: string) => ['donation', id] as const,
  impact: ['impact'] as const,
  leaderboard: ['leaderboard'] as const,
  badges: ['badges'] as const,
  testimonials: ['testimonials'] as const,
  community: ['community'] as const,
  tracking: (id: string) => ['tracking', id] as const,
};

export const useDonations = (status?: DonationStatus) =>
  useQuery({ queryKey: keys.donations(status), queryFn: () => api.getDonations(status ? { status } : undefined) });

export const useDonation = (id: string) =>
  useQuery({ queryKey: keys.donation(id), queryFn: () => api.getDonation(id), enabled: !!id });

export const useImpact = () => useQuery({ queryKey: keys.impact, queryFn: api.getImpact });
export const useLeaderboard = () => useQuery({ queryKey: keys.leaderboard, queryFn: api.getLeaderboard });
export const useBadges = () => useQuery({ queryKey: keys.badges, queryFn: api.getBadges });
export const useTestimonials = () => useQuery({ queryKey: keys.testimonials, queryFn: api.getTestimonials });
export const useCommunity = () => useQuery({ queryKey: keys.community, queryFn: api.getCommunity });
export const useTracking = (id: string) =>
  useQuery({ queryKey: keys.tracking(id), queryFn: () => api.getTracking(id), enabled: !!id });

export const useCreateDonation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Donation>) => api.createDonation(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donations'] }),
  });
};

export const useUpdateStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DonationStatus }) =>
      api.updateDonationStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donations'] }),
  });
};
