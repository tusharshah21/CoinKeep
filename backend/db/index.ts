import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}?schema=public`;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle({ client: pool });
