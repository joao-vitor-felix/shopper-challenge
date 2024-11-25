import { InvalidDriverError, NoRidesFoundError } from "@/errors";
import { FindDriverByIdRepositoryPort } from "@/ports/driver";
import { GetRidesRepositoryPort } from "@/ports/ride";
import { Rides } from "@/types/ride";

export interface IGetRidesUseCase {
  getRides(customer_id: string, driver_id?: number): Promise<Rides>;
}

export class GetRidesUseCase implements IGetRidesUseCase {
  constructor(
    private getRidesPostgresRepository: GetRidesRepositoryPort,
    private findDriverByIdRepository: FindDriverByIdRepositoryPort
  ) {}
  async getRides(customer_id: string, driver_id?: number): Promise<Rides> {
    if (driver_id) {
      const driver =
        await this.findDriverByIdRepository.findDriverById(driver_id);
      if (!driver) {
        throw new InvalidDriverError();
      }
    }

    const rides = await this.getRidesPostgresRepository.getRides(
      customer_id,
      driver_id
    );

    if (!rides.rides.length) {
      throw new NoRidesFoundError();
    }

    return rides;
  }
}
