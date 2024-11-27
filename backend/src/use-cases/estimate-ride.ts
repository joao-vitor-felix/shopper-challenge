import { CustomerNotFoundError } from "@/errors";
import { FindCustomerByIdRepositoryPort } from "@/ports/customer";
import { EstimateRideRepositoryPort } from "@/ports/ride";
import { RideOptions } from "@/types/ride";

export type EstimateRideInput = {
  customer_id: string;
  origin: string;
  destination: string;
};

export interface IEstimateRideUseCase {
  estimate(input: EstimateRideInput): Promise<RideOptions | null>;
}

export class EstimateRideUseCase {
  constructor(
    private estimateRideRepository: EstimateRideRepositoryPort,
    private findCustomerByIdRepository: FindCustomerByIdRepositoryPort
  ) {}
  async estimate(input: EstimateRideInput) {
    const customer = await this.findCustomerByIdRepository.findCustomerById(
      input.customer_id
    );

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    const rideOptions = await this.estimateRideRepository.estimate(input);
    return rideOptions;
  }
}
