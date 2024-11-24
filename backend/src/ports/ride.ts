import { ConfirmPayload } from "@/schemas/ride";

export interface ConfirmRideRepositoryPort {
  confirm(ride: ConfirmPayload): Promise<void>;
}

export interface EstimateRideRepositoryPort {
  estimate(): {};
}

export interface GetRidesRepositoryPort {
  getRides(): {};
}
