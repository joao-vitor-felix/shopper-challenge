import { ConfirmRidesPayload } from "@/schemas/ride";
import { Rides } from "@/types/ride";

export interface ConfirmRideRepositoryPort {
  confirm(ride: ConfirmRidesPayload): Promise<void>;
}

// export interface EstimateRideRepositoryPort {
//   estimate(): {};
// }

export interface GetRidesRepositoryPort {
  getRides(customer_id: string, driver_id?: number): Promise<Rides>;
}
