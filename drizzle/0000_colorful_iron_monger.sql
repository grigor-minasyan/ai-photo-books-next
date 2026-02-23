CREATE TYPE "public"."book_lifecycle_status" AS ENUM('draft', 'processing', 'ready', 'failed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."prompt_key" AS ENUM('generate_book', 'generate_character_from_image', 'generate_generic_image', 'generate_image_based_on_another');--> statement-breakpoint
CREATE TABLE "book_product_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_product_id" uuid NOT NULL,
	"page_number" integer NOT NULL,
	"text_template" text NOT NULL,
	"image_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_product_pages_product_page_unique" UNIQUE("book_product_id","page_number"),
	CONSTRAINT "book_product_pages_page_number_positive" CHECK ("book_product_pages"."page_number" > 0)
);
--> statement-breakpoint
CREATE TABLE "book_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title_template" text NOT NULL,
	"cover_image_description" text NOT NULL,
	"ending_text_template" text NOT NULL,
	"back_cover_image_description" text NOT NULL,
	"source_generated_book_id" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"source_portrait_path" text NOT NULL,
	"generated_portrait_path" text,
	"metadata_json" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generated_book_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generated_book_id" uuid NOT NULL,
	"page_number" integer NOT NULL,
	"text_content" text,
	"image_path" text NOT NULL,
	"image_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generated_book_pages_book_page_unique" UNIQUE("generated_book_id","page_number"),
	CONSTRAINT "generated_book_pages_page_number_positive" CHECK ("generated_book_pages"."page_number" > 0)
);
--> statement-breakpoint
CREATE TABLE "generated_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_product_id" uuid NOT NULL,
	"character_id" uuid NOT NULL,
	"status" "book_lifecycle_status" DEFAULT 'draft' NOT NULL,
	"cover_image_path" text,
	"back_cover_image_path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" "prompt_key" NOT NULL,
	"prompt_text" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book_product_pages" ADD CONSTRAINT "book_product_pages_book_product_id_book_products_id_fk" FOREIGN KEY ("book_product_id") REFERENCES "public"."book_products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "book_products" ADD CONSTRAINT "book_products_source_generated_book_id_generated_books_id_fk" FOREIGN KEY ("source_generated_book_id") REFERENCES "public"."generated_books"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "generated_book_pages" ADD CONSTRAINT "generated_book_pages_generated_book_id_generated_books_id_fk" FOREIGN KEY ("generated_book_id") REFERENCES "public"."generated_books"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "generated_books" ADD CONSTRAINT "generated_books_book_product_id_book_products_id_fk" FOREIGN KEY ("book_product_id") REFERENCES "public"."book_products"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "generated_books" ADD CONSTRAINT "generated_books_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "book_product_pages_product_idx" ON "book_product_pages" USING btree ("book_product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "book_products_slug_uidx" ON "book_products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "book_products_source_generated_book_uidx" ON "book_products" USING btree ("source_generated_book_id");--> statement-breakpoint
CREATE INDEX "book_products_active_idx" ON "book_products" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "characters_slug_uidx" ON "characters" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "characters_active_idx" ON "characters" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "generated_book_pages_book_idx" ON "generated_book_pages" USING btree ("generated_book_id");--> statement-breakpoint
CREATE INDEX "generated_books_book_product_idx" ON "generated_books" USING btree ("book_product_id");--> statement-breakpoint
CREATE INDEX "generated_books_character_idx" ON "generated_books" USING btree ("character_id");--> statement-breakpoint
CREATE INDEX "generated_books_status_idx" ON "generated_books" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "prompt_templates_key_uidx" ON "prompt_templates" USING btree ("key");--> statement-breakpoint
CREATE INDEX "prompt_templates_active_idx" ON "prompt_templates" USING btree ("is_active");