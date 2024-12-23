import { useQuery } from '@tanstack/react-query';
import { getAddons } from '@/services/api';

export function useAddons() {
  return useQuery({
    queryKey: ['addons'],
    queryFn: getAddons,
  });
} 