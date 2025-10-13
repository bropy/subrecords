CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" varchar(255) NOT NULL,
	"album_name" varchar(255) NOT NULL,
	"artist_name" varchar(255) NOT NULL,
	"artwork_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "albums_album_id_unique" UNIQUE("album_id")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_db_id" uuid NOT NULL,
	"user_name" varchar(100) NOT NULL,
	"title" varchar(200) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_album_db_id_albums_id_fk" FOREIGN KEY ("album_db_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;