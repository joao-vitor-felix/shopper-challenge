import { pool } from "@/db/db";
import { ConfirmRideRepositoryPort } from "@/ports/ride";
import { ConfirmRidesPayload } from "@/schemas/ride";

export class ConfirmRidePostgresRepository
  implements ConfirmRideRepositoryPort
{
  async confirm(input: ConfirmRidesPayload) {
    const client = await pool.connect();
    const query = `
      INSERT INTO
        ride (
          customer_id,
          driver_id,
          origin_location,
          destination_location,
          estimated_duration_seconds,
          amount,
          distance_meters
        )
      VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
        )
    `;

    const values = [
      input.customer_id,
      input.driver.id,
      input.origin,
      input.destination,
      parseInt(input.duration),
      input.value,
      input.distance
    ];
    await client.query(query, values);
    client.release();
  }
}
