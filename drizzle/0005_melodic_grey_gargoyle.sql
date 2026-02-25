CREATE TYPE "public"."product_locale" AS ENUM('en', 'hy');--> statement-breakpoint
CREATE TABLE "book_product_localizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_product_id" uuid NOT NULL,
	"locale" "product_locale" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_product_localizations_product_locale_unique" UNIQUE("book_product_id","locale")
);
--> statement-breakpoint
ALTER TABLE "book_product_localizations" ADD CONSTRAINT "book_product_localizations_book_product_id_book_products_id_fk" FOREIGN KEY ("book_product_id") REFERENCES "public"."book_products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "book_product_localizations_product_idx" ON "book_product_localizations" USING btree ("book_product_id");--> statement-breakpoint
CREATE INDEX "book_product_localizations_locale_idx" ON "book_product_localizations" USING btree ("locale");