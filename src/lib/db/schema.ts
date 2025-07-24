import { pgTable, varchar, timestamp, text, integer } from 'drizzle-orm/pg-core';
import { randomUUID } from 'crypto';

export const user = pgTable('user', {
  id: varchar('id', { length: 255 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
});

export const account = pgTable('account', {
  id: varchar('id', { length: 255 }).primaryKey().$defaultFn(() => randomUUID()),
  userId: varchar('userId', { length: 255 }).notNull().references(() => user.id),
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 255 }),
}, (table) => {
  return {
    provider_providerAccountId_key: {
      unique: [table.provider, table.providerAccountId],
      name: 'provider_providerAccountId_key',
    },
  };
});

export const session = pgTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull().references(() => user.id),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});