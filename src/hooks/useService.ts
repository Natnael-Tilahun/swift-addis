import { useQuery } from '@tanstack/react-query';
import { getServiceById } from '@/services/api';

export function useServiceById(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => getServiceById(id),
    enabled: !!id, // Only fetch when id is provided
  });
} 