import dotenv from "dotenv";
import { Client } from "pg";

export const ensureDatabaseExists = async () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

  const client = new Client({
    host: DB_HOST,
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await client.connect();

  try {
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );
    const dbExists = res.rowCount > 0;

    if (!dbExists) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✅ Database "${DB_NAME}" created.`);
    } else {
      console.log(`ℹ️ Database "${DB_NAME}" already exists.`);
    }

    await client.end();
  } catch (error) {
    console.log(error.message);
  }
};

ensureDatabaseExists();
