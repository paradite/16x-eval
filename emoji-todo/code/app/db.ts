import { neon, neonConfig } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

neonConfig.fetchConnectionCache = true;
const client = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: 'no-store',
  },
});
export const db = drizzle(client);

export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  text: varchar('text', { length: 10 }).default(''),
  created_at: timestamp('created_at').default(sql`NOW()`),
});
