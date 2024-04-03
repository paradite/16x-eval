// @ts-nocheck

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import {processFileContent} from '#preload';

neonConfig.fetchConnectionCache = true;
// establish a connection to the database
const client = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: 'no-store',
  },
});
export const db = drizzle(client);

export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  text: varchar('text', { length: 10 }).default('#'),
});
