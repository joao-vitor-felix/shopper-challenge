import { ConfirmRideRepositoryPort } from "@/ports/ride";
import { ConfirmPayload } from "@/schemas/ride";
import { CustomerNotFoundError } from "@/errors/customer";
import { FindCustomerByIdRepositoryPort } from "@/ports/customer";
import { FindDriverByIdRepositoryPort } from "@/ports/driver";
import { DriverNotFoundError, InvalidDistanceError } from "@/errors/ride";

export interface IConfirmRideUseCase {
  confirm(ride: ConfirmPayload): Promise<void>;
}

export class ConfirmRideUseCase implements IConfirmRideUseCase {
  constructor(
    private confirmRideRepository: ConfirmRideRepositoryPort,
    private findCustomerByIdRepository: FindCustomerByIdRepositoryPort,
    private findDriverByIdRepository: FindDriverByIdRepositoryPort
  ) {}
  async confirm(ride: ConfirmPayload) {
    const customer = await this.findCustomerByIdRepository.findCustomerById(
      ride.customer_id
    );

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    const driver = await this.findDriverByIdRepository.findDriverById(
      ride.driver.id
    );

    if (!driver) {
      throw new DriverNotFoundError();
    }

    if (ride.distance < driver.min_acceptable_meters) {
      throw new InvalidDistanceError();
    }

    await this.confirmRideRepository.confirm(ride);
  }
}
