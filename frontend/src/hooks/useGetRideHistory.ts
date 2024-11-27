import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/client";
import { GetRidesResponse } from "@/types/get-rides";

type GetRideHistory = {
  customerId: string;
  driverId?: number;
};

export function useGetRideHistory(params: GetRideHistory) {
  const driverId = params.driverId ? `${params.driverId}` : "";
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["rides", params],
    queryFn: async () => {
      const { data } = await api.get<GetRidesResponse>(
        `ride/${params.customerId}?driver_id=${driverId}`
      );
      return data;
    },
    retry: 1
  });

  return { data, isLoading, error, refetch };
}
