import { date, integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar().notNull().unique(),
});

export const platformsTable = pgTable('platforms', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id),
  platformName: varchar({ length: 200 }).notNull().unique(),
  plt_username: varchar({ length: 250 }).notNull(),
  last_synced: date().defaultNow(),
});

export const platform_snapshot = pgTable('platforn_snapshot', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  platform_id: integer()
    .notNull()
    .references(() => platformsTable.id),
  total_solved: integer().default(0),
  easy: integer().default(0),
  medium: integer().default(0),
  hard: integer().default(0),
  date: date().defaultNow(),
});

export const submission_activity = pgTable(
  'submission_activity',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    platform_id: integer()
      .notNull()
      .references(() => platformsTable.id),
    count: integer().default(0),
    date: date().defaultNow(),
  },
  (table) => [unique().on(table.platform_id, table.date)],
);
