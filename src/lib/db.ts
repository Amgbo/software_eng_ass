// src/lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp_db',
  password: 'Siderpsk123$',
  port: 5432,
});

export default pool;