import { DriverNotFoundError, InvalidDistanceError } from "@/errors";
import { CustomerNotFoundError } from "@/errors/customer";
import { FindCustomerByIdRepositoryPort } from "@/ports/customer";
import { FindDriverByIdRepositoryPort } from "@/ports/driver";
import { ConfirmRideRepositoryPort } from "@/ports/ride";
import { ConfirmRidesPayload } from "@/schemas/ride";

export interface IConfirmRideUseCase {
  confirm(ride: ConfirmRidesPayload): Promise<void>;
}

export class ConfirmRideUseCase implements IConfirmRideUseCase {
  constructor(
    private confirmRideRepository: ConfirmRideRepositoryPort,
    private findCustomerByIdRepository: FindCustomerByIdRepositoryPort,
    private findDriverByIdRepository: FindDriverByIdRepositoryPort
  ) {}
  async confirm(ride: ConfirmRidesPayload) {
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
