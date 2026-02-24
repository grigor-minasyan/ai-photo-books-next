import z from "zod";

import { serverEnv } from "@/lib/server-env";

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

export const env = {
  GEMINI_API_KEY: serverEnv.GEMINI_API_KEY,
  REDIS_URL: serverEnv.REDIS_URL,
};
