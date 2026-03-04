import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.PG_DB_URL,
});

export default pool;
