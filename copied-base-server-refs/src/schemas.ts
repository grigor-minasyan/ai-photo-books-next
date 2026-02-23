import z from "zod";

export const BOOK_PAGE_COUNT = 30;

export const bookSchema = z.strictObject({
  title: z.string().min(1).max(100),
  coverImageDescription: z.string().min(1),
  pages: z
    .array(
      z.strictObject({
        text: z.string().min(1).max(200),
        imageDescription: z.string().min(1),
      }),
    )
    .length(BOOK_PAGE_COUNT),
  endingText: z.string().min(1).max(400),
  backCoverImageDescription: z.string().min(1),
});

export type Book = z.infer<typeof bookSchema>;

export const env = z
  .object({
    GEMINI_API_KEY: z.string().min(1),
    REDIS_URL: z.string().min(1),
  })
  .parse(process.env);
