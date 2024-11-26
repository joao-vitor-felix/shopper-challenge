import axios from "axios";

import { pool } from "@/db/db";
import { EstimateRideRepositoryPort } from "@/ports/ride";
import { DirectionsResponse } from "@/types/directions";
import { RideOptions } from "@/types/ride";
import { EstimateRideInput } from "@/use-cases/estimate-ride";

type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  comment: string;
  rating: number;
  amount: number;
};

export class EstimateRidePostgresRepository
  implements EstimateRideRepositoryPort
{
  async estimate(input: EstimateRideInput): Promise<RideOptions> {
    const { data: directions } = await axios.get<DirectionsResponse>(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${input.origin}&destination=${input.destination}&key=${process.env.GOOGLE_API_KEY}`
    );

    const client = await pool.connect();
    const query = `
      SELECT
        driver.id,
        driver.name,
        driver.description,
        driver.vehicle,
        reviews.rating,
        reviews.comment,
        ROUND(($1::DECIMAL / 1000 * driver.tax_rate), 2) AS amount
      FROM
        driver
      JOIN (
          SELECT
            DISTINCT ON (driver_id) driver_id,
            comment,
            rating,
            created_at
          FROM
            review
          ORDER BY driver_id, created_at DESC
        ) AS reviews ON driver.id = reviews.driver_id
      WHERE
        driver.min_acceptable_meters <= $1
      ORDER BY
        amount;
    `;

    const legs = directions.routes[0].legs[0];
    const drivers = await client.query<Driver>(query, [legs.distance.value]);
    client.release();

    return {
      origin: {
        latitude: legs.start_location.lat,
        longitude: legs.start_location.lng
      },
      destination: {
        latitude: legs.end_location.lat,
        longitude: legs.end_location.lng
      },
      distance: legs.distance.value,
      duration: legs.duration.value.toString(),
      options: drivers.rows.map(row => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          review: {
            rating: parseFloat(row.rating.toString()),
            comment: row.comment
          },
          vehicle: row.vehicle,
          value: parseFloat(row.amount.toString())
        };
      }),
      routeResponse: directions
    };
  }
}
