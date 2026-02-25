import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import {
  bookProductPages,
  bookProducts,
  generatedBookPages,
  generatedBooks,
} from "@/lib/db/schema";

const IMAGE_PLACEHOLDER_PATH = "/file.svg";

function normalizeProductImagePath(imagePath: string | null): string {
  if (!imagePath) {
    return IMAGE_PLACEHOLDER_PATH;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  return IMAGE_PLACEHOLDER_PATH;
}

export type HomepageBookProduct = {
  id: string;
  slug: string;
  titleTemplate: string;
  coverImagePath: string;
  rawCoverImagePath: string | null;
};

export async function listHomepageBookProducts(): Promise<
  HomepageBookProduct[]
> {
  const rows = await db
    .select({
      id: bookProducts.id,
      slug: bookProducts.slug,
      titleTemplate: bookProducts.titleTemplate,
      rawCoverImagePath: generatedBooks.coverImagePath,
    })
    .from(bookProducts)
    .leftJoin(
      generatedBooks,
      eq(bookProducts.sourceGeneratedBookId, generatedBooks.id),
    )
    .where(eq(bookProducts.isActive, true))
    .orderBy(asc(bookProducts.createdAt));

  return rows.map((row) => ({
    ...row,
    coverImagePath: normalizeProductImagePath(row.rawCoverImagePath),
  }));
}

export type BookProductDetails = {
  id: string;
  slug: string;
  titleTemplate: string;
  coverImageDescription: string;
  endingTextTemplate: string;
  backCoverImageDescription: string;
  sourceGeneratedBookId: string | null;
  coverImagePath: string;
  rawCoverImagePath: string | null;
  templatePages: Array<{
    id: string;
    pageNumber: number;
    textTemplate: string;
    imageDescription: string | null;
  }>;
  sourcePages: Array<{
    id: string;
    pageNumber: number;
    textContent: string | null;
    imagePath: string;
    imageDescription: string | null;
  }>;
};

export async function getBookProductBySlug(
  slug: string,
): Promise<BookProductDetails | null> {
  const [productRow] = await db
    .select({
      id: bookProducts.id,
      slug: bookProducts.slug,
      titleTemplate: bookProducts.titleTemplate,
      coverImageDescription: bookProducts.coverImageDescription,
      endingTextTemplate: bookProducts.endingTextTemplate,
      backCoverImageDescription: bookProducts.backCoverImageDescription,
      sourceGeneratedBookId: bookProducts.sourceGeneratedBookId,
      rawCoverImagePath: generatedBooks.coverImagePath,
    })
    .from(bookProducts)
    .leftJoin(
      generatedBooks,
      eq(bookProducts.sourceGeneratedBookId, generatedBooks.id),
    )
    .where(and(eq(bookProducts.slug, slug), eq(bookProducts.isActive, true)))
    .limit(1);

  if (!productRow) {
    return null;
  }

  const templatePages = await db
    .select({
      id: bookProductPages.id,
      pageNumber: bookProductPages.pageNumber,
      textTemplate: bookProductPages.textTemplate,
      imageDescription: bookProductPages.imageDescription,
    })
    .from(bookProductPages)
    .where(eq(bookProductPages.bookProductId, productRow.id))
    .orderBy(asc(bookProductPages.pageNumber));

  const sourcePages = productRow.sourceGeneratedBookId
    ? await db
        .select({
          id: generatedBookPages.id,
          pageNumber: generatedBookPages.pageNumber,
          textContent: bookProductPages.textTemplate,
          imagePath: generatedBookPages.imagePath,
          imageDescription: bookProductPages.imageDescription,
        })
        .from(generatedBookPages)
        .leftJoin(
          bookProductPages,
          and(
            eq(bookProductPages.bookProductId, productRow.id),
            eq(bookProductPages.pageNumber, generatedBookPages.pageNumber),
          ),
        )
        .where(
          eq(
            generatedBookPages.generatedBookId,
            productRow.sourceGeneratedBookId,
          ),
        )
        .orderBy(asc(generatedBookPages.pageNumber))
    : [];

  return {
    ...productRow,
    coverImagePath: normalizeProductImagePath(productRow.rawCoverImagePath),
    templatePages,
    sourcePages,
  };
}
