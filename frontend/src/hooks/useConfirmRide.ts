import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/client";

type ConfirmRideParams = {
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

type ConfirmRideHookParams = {
  onSuccess: () => void;
  onError: () => void;
};

export function useConfirmRide({ onSuccess, onError }: ConfirmRideHookParams) {
  const { data, isPending, mutate } = useMutation({
    mutationFn: async (data: ConfirmRideParams) => {
      await api.patch("/ride/confirm", {
        customer_id: data.customerId,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        driver: {
          id: data.driver.id,
          name: data.driver.name
        },
        value: data.value
      });
    },
    onError: () => onError(),
    onSuccess: () => onSuccess(),
    mutationKey: ["confirmRide"],
    retry: 1
  });

  return { data, isPending, mutate };
}
