CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3)
);
