import { drizzle } from "drizzle-orm/mysql2";
import * as schema from './schema'

const db = drizzle(process.env.DATABASE_URL!, { casing: 'snake_case', logger: true, schema, mode: 'default' });

export default db;