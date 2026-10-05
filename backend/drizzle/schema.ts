import { pgTable, integer, varchar, date, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const platforms = pgTable("platforms", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id").notNull().references(() => users.id),
	platformName: varchar({ length: 200 }).notNull(),
	userName: varchar({ length: 250 }).notNull(),
	lastSynced: date("last_synced").default(sql`now()`),
}, (table) => [
	unique("platforms_platformName_key").on(table.platformName),]);

export const platfornSnapshot = pgTable("platforn_snapshot", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	platformId: integer("platform_id").notNull().references(() => platforms.id),
	totalSolved: integer("total_solved").default(0),
	easy: integer().default(0),
	medium: integer().default(0),
	hard: integer().default(0),
	date: date().default(sql`now()`),
});

export const submissionActivity = pgTable("submission_activity", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	platformId: integer("platform_id").notNull().references(() => platforms.id),
	count: integer().default(0),
	date: date().default(sql`now()`),
});

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	username: varchar().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),	unique("users_username_key").on(table.username),]);
