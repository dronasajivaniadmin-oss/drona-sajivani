import { Pool } from 'pg';
const globalForDb = globalThis as unknown as { dronaPool?: Pool };
export const db = globalForDb.dronaPool ?? new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });
if (process.env.NODE_ENV !== 'production') globalForDb.dronaPool = db;
