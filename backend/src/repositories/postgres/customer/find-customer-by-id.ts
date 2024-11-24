import { pool } from "@/db/db";
import { FindCustomerByIdRepositoryPort } from "@/ports/customer";
import { Customer } from "@/types/customer";

export class FindCustomerByIdPostgresRepository
  implements FindCustomerByIdRepositoryPort
{
  async findCustomerById(id: string) {
    const client = await pool.connect();
    const query = `
     SELECT * FROM customer WHERE id = $1
    `;
    const customer = await client.query<Customer>(query, [id]);
    client.release();
    return customer.rows[0] ?? null;
  }
}
