import { pool } from "@/db/db";
import { GetRidesRepositoryPort } from "@/ports/ride";
import { Ride, Rides } from "@/types/ride";

export class GetRidesPostgresRepository implements GetRidesRepositoryPort {
  async getRides(customer_id: string, driver_id?: number): Promise<Rides> {
    const client = await pool.connect();
    const query = `
      SELECT
        ride.*,
        driver.name AS driver_name
      FROM
        ride
      JOIN driver
      ON ride.driver_id = driver.id
      WHERE
        customer_id = $1
        AND (
          $2::int IS NULL
          OR driver_id = $2::int
        )
      ORDER BY
        created_at DESC;
    `;

    const rides = await client.query<Ride & { driver_name: string }>(query, [
      customer_id,
      driver_id
    ]);
    client.release();

    return {
      customer_id: customer_id,
      rides: rides.rows.map(row => {
        return {
          id: row.id,
          date: row.created_at,
          origin: row.origin_location,
          destination: row.destination_location,
          distance: row.distance_meters,
          duration: row.estimated_duration_seconds.toString(),
          driver: {
            id: row.driver_id,
            name: row.driver_name
          },
          value: parseFloat(row.amount.toString())
        };
      })
    };
  }
}
