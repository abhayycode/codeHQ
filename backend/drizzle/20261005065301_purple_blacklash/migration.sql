-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "platforms" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "platforms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"platformName" varchar(200) NOT NULL CONSTRAINT "platforms_platformName_key" UNIQUE,
	"userName" varchar(250) NOT NULL,
	"last_synced" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "platforn_snapshot" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "platforn_snapshot_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"platform_id" integer NOT NULL,
	"total_solved" integer DEFAULT 0,
	"easy" integer DEFAULT 0,
	"medium" integer DEFAULT 0,
	"hard" integer DEFAULT 0,
	"date" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "submission_activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "submission_activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"platform_id" integer NOT NULL,
	"count" integer DEFAULT 0,
	"date" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"username" varchar NOT NULL CONSTRAINT "users_username_key" UNIQUE
);
--> statement-breakpoint
ALTER TABLE "platforn_snapshot" ADD CONSTRAINT "platforn_snapshot_platform_id_platforms_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id");--> statement-breakpoint
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "submission_activity" ADD CONSTRAINT "submission_activity_platform_id_platforms_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id");
*/