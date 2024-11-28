import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/client";
import { GetRidesResponse } from "@/types/get-rides";

type GetRideHistory = {
  customerId: string;
  driver?: {
    id: number;
    name: string;
  };
};

export function useGetRideHistory(params: GetRideHistory) {
  const client = useQueryClient();
  const driverId = params.driver?.id ?? "";
  const { data, isLoading, error, refetch } = useQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    queryKey: ["rides", params],
    queryFn: async () => {
      await client.invalidateQueries({
        queryKey: ["rides", params],
        stale: false
      });
      const { data } = await api.get<GetRidesResponse>(
        `ride/${params.customerId}?driver_id=${driverId}`
      );
      return data;
    },
    retry: 1
  });

  return { data, isLoading, error, refetch };
}
