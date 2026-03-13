import z from "zod";

export const BOOK_PAGE_COUNT = 30;

export const generatedBookSchema = z.strictObject({
  title: z.string().min(1).max(100),
  coverImageDescription: z.string().min(1),
  pages: z
    .array(
      z.strictObject({
        text: z.string().min(1).max(400),
        imageDescription: z.string().min(1),
      }),
    )
    .length(BOOK_PAGE_COUNT),
  endingText: z.string().min(1).max(800),
  backCoverImageDescription: z.string().min(1),
});

export type GeneratedBookSchema = z.infer<typeof generatedBookSchema>;
