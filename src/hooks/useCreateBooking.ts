import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '@/services/api';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      // Invalidate relevant queries after successful booking
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
} 