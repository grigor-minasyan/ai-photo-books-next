CREATE TYPE "public"."book_variation_key" AS ENUM('hardcover', 'softcover');--> statement-breakpoint
CREATE TABLE "book_product_variation_pricing" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_product_id" uuid NOT NULL,
	"book_variation_id" uuid NOT NULL,
	"original_price_cents" integer NOT NULL,
	"reduced_price_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_product_variation_pricing_product_variation_unique" UNIQUE("book_product_id","book_variation_id"),
	CONSTRAINT "book_product_variation_pricing_original_min" CHECK ("book_product_variation_pricing"."original_price_cents" >= 1000),
	CONSTRAINT "book_product_variation_pricing_reduced_min" CHECK ("book_product_variation_pricing"."reduced_price_cents" >= 1000),
	CONSTRAINT "book_product_variation_pricing_reduced_lte_original" CHECK ("book_product_variation_pricing"."reduced_price_cents" <= "book_product_variation_pricing"."original_price_cents")
);
--> statement-breakpoint
CREATE TABLE "book_variations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" "book_variation_key" NOT NULL,
	"label" text NOT NULL,
	"page_count" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_variations_page_count_positive" CHECK ("book_variations"."page_count" > 0)
);
--> statement-breakpoint
ALTER TABLE "book_product_variation_pricing" ADD CONSTRAINT "book_product_variation_pricing_book_product_id_book_products_id_fk" FOREIGN KEY ("book_product_id") REFERENCES "public"."book_products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "book_product_variation_pricing" ADD CONSTRAINT "book_product_variation_pricing_book_variation_id_book_variations_id_fk" FOREIGN KEY ("book_variation_id") REFERENCES "public"."book_variations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "book_product_variation_pricing_product_idx" ON "book_product_variation_pricing" USING btree ("book_product_id");--> statement-breakpoint
CREATE INDEX "book_product_variation_pricing_variation_idx" ON "book_product_variation_pricing" USING btree ("book_variation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "book_variations_key_uidx" ON "book_variations" USING btree ("key");--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."enforce_shared_variation_page_limit"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
	shared_page_limit integer;
BEGIN
	SELECT min(page_count)
	INTO shared_page_limit
	FROM book_variations;

	IF shared_page_limit IS NULL THEN
		RAISE EXCEPTION
			'Cannot validate %.page_number because table book_variations is empty',
			TG_TABLE_NAME;
	END IF;

	IF NEW.page_number > shared_page_limit THEN
		RAISE EXCEPTION
			'Invalid %.page_number=%: allowed maximum is % from book_variations.page_count',
			TG_TABLE_NAME,
			NEW.page_number,
			shared_page_limit;
	END IF;

	RETURN NEW;
END;
$$;--> statement-breakpoint
CREATE TRIGGER "book_product_pages_shared_page_limit_trigger"
BEFORE INSERT OR UPDATE OF "page_number"
ON "book_product_pages"
FOR EACH ROW
EXECUTE FUNCTION "public"."enforce_shared_variation_page_limit"();--> statement-breakpoint
CREATE TRIGGER "generated_book_pages_shared_page_limit_trigger"
BEFORE INSERT OR UPDATE OF "page_number"
ON "generated_book_pages"
FOR EACH ROW
EXECUTE FUNCTION "public"."enforce_shared_variation_page_limit"();