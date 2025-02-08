import { Pool } from "pg";

const pool = new Pool({
  user: "postgres.uahhhhpiwjzimsoaxlbx",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: "dlxGdN9v4YXmHXnq",
  port: 6543,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
