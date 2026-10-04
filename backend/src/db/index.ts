import { defineRelations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!);
const relations = defineRelations(schema);

export const db = drizzle({ client, relations });
