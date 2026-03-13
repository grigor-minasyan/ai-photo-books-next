ALTER TABLE "generated_book_pages" ALTER COLUMN "image_path" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "generated_book_pages" ADD COLUMN "raw_image_path" text;--> statement-breakpoint
ALTER TABLE "generated_books" ADD COLUMN "raw_cover_image_path" text;--> statement-breakpoint
ALTER TABLE "generated_books" ADD COLUMN "raw_back_cover_image_path" text;