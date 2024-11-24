import { Pool } from "pg";
import fs from "node:fs";

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT as unknown as number,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 1000
});

//TODO: run when the app starts
export const setupDatabase = async () => {
  const client = await pool.connect();
  let query = fs.readFileSync("./sql/setup.sql", "utf8");
  await client.query(query);
  client.release();
};
