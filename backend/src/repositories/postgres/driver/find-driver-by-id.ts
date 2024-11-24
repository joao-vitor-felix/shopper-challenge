import { pool } from "@/db/db";
import { FindDriverByIdRepositoryPort } from "@/ports/driver";
import { Driver } from "@/types/driver";

export class FindDriverByIdPostgresRepository
  implements FindDriverByIdRepositoryPort
{
  async findDriverById(id: number) {
    const client = await pool.connect();
    const query = `
     SELECT * FROM driver WHERE id = $1
    `;
    const driver = await client.query<Driver>(query, [id]);
    client.release();
    return driver.rows[0] ?? null;
  }
}
