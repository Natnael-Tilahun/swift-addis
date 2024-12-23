import { useQuery } from '@tanstack/react-query';
import { getAvailableSlots } from '@/services/api';

export function useAvailableSlots(date: string) {
  return useQuery({
    queryKey: ["availableSlots", date],
    queryFn: () => getAvailableSlots(date),
    enabled: !!date, // Only fetch when date is provided
    refetchInterval: 60000, // Automatically refresh every 60 seconds
  });
} 