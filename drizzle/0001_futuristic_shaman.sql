CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"platform_name" varchar(100),
	"account" varchar(100),
	"account_url" text,
	"highest_rating" varchar(100),
	"solve_count" varchar(100),
	"contest_count" varchar(100),
	"contest_name" varchar(255),
	"date" varchar(100),
	"result" varchar(100),
	"description" text,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "achievements_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"icon_key" varchar(100) NOT NULL,
	"date" varchar(100) NOT NULL,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "activities_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"period" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"institution" varchar(255) NOT NULL,
	"description" text,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "education_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"period" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "experience_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"site_name" varchar(255) NOT NULL,
	"site_url" varchar(500) NOT NULL,
	"site_description" text,
	"site_keywords" jsonb,
	"site_image_url" text,
	"logo_initials" varchar(50),
	"twitter_handle" varchar(100),
	"theme_color" varchar(50),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "site_settings_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"short_name" varchar(255) NOT NULL,
	"profile_image_url" text,
	"hero_image_url" text,
	"typewriter_titles" jsonb NOT NULL,
	"hero_bio" text NOT NULL,
	"about_paragraphs" jsonb NOT NULL,
	"info_grid" jsonb,
	"resume_file_url" text,
	"resume_file_name" varchar(255),
	"drive_url" text,
	"drive_password" varchar(100),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"platform" varchar(100) NOT NULL,
	"label" varchar(100) NOT NULL,
	"url" text NOT NULL,
	"section" varchar(50) DEFAULT 'both' NOT NULL,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "social_links_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "skill_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"category_id" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"order" integer DEFAULT 10 NOT NULL,
	"skills" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "skill_categories_sanity_id_unique" UNIQUE("sanity_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"tech_stack" jsonb NOT NULL,
	"github_url" text,
	"live_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_sanity_id_unique" UNIQUE("sanity_id"),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"author" varchar(255) DEFAULT '' NOT NULL,
	"image_url" text,
	"category" varchar(100) NOT NULL,
	"tags" jsonb,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"excerpt" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"body" jsonb,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_sanity_id_unique" UNIQUE("sanity_id"),
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "research" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sanity_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"conference" varchar(255) NOT NULL,
	"year" varchar(50) NOT NULL,
	"abstract" text NOT NULL,
	"authors" jsonb,
	"pdf_url" text,
	"doi" varchar(255),
	"order" integer DEFAULT 10 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "research_sanity_id_unique" UNIQUE("sanity_id"),
	CONSTRAINT "research_slug_unique" UNIQUE("slug")
);
