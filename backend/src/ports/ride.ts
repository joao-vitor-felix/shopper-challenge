import { ConfirmRidesPayload } from "@/schemas/ride";
import { RideOptions, Rides } from "@/types/ride";
import { EstimateRideInput } from "@/use-cases/estimate-ride";

export interface ConfirmRideRepositoryPort {
  confirm(ride: ConfirmRidesPayload): Promise<void>;
}

export interface EstimateRideRepositoryPort {
  estimate(input: EstimateRideInput): Promise<RideOptions>;
}

export interface GetRidesRepositoryPort {
  getRides(customer_id: string, driver_id?: number): Promise<Rides>;
}
