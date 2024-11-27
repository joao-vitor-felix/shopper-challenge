import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/client";
import { EstimateResponse } from "@/types/estimate";

type GetRideOptionsParams = {
  customerId: string;
  origin: string;
  destination: string;
};

export function useGetRideOptions(params: GetRideOptionsParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getRideOptions", params],
    queryFn: async () => {
      const { data } = await api.post<EstimateResponse>("ride/estimate", {
        customer_id: params.customerId,
        origin: params.origin,
        destination: params.destination
      });
      return data;
    }
  });

  return { data, error, isLoading };
}
