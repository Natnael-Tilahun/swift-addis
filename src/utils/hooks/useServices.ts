import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/services/api';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
}