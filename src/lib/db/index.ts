import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.SSL_CERT ? { ca: process.env.SSL_CERT, rejectUnauthorized: true } : undefined
});

export const db = drizzle(pool, { schema });