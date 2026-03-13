import { and, asc, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db/client";
import {
  bookProducts,
  characters,
  generatedBookPages,
  generatedBooks,
} from "@/lib/db/schema";

export async function listAdminGeneratedBooks() {
  return db
    .select({
      id: generatedBooks.id,
      status: generatedBooks.status,
      bookProductId: generatedBooks.bookProductId,
      bookProductSlug: bookProducts.slug,
      characterId: generatedBooks.characterId,
      characterName: characters.name,
      rawCoverImagePath: generatedBooks.rawCoverImagePath,
      coverImagePath: generatedBooks.coverImagePath,
      rawBackCoverImagePath: generatedBooks.rawBackCoverImagePath,
      backCoverImagePath: generatedBooks.backCoverImagePath,
      updatedAt: generatedBooks.updatedAt,
    })
    .from(generatedBooks)
    .innerJoin(bookProducts, eq(bookProducts.id, generatedBooks.bookProductId))
    .innerJoin(characters, eq(characters.id, generatedBooks.characterId))
    .orderBy(asc(generatedBooks.createdAt));
}

export async function getGeneratedBookAdminDetail(generatedBookId: string) {
  const [book] = await db
    .select({
      id: generatedBooks.id,
      status: generatedBooks.status,
      bookProductId: generatedBooks.bookProductId,
      bookProductSlug: bookProducts.slug,
      bookTitleTemplate: bookProducts.titleTemplate,
      endingTextTemplate: bookProducts.endingTextTemplate,
      backCoverImageDescription: bookProducts.backCoverImageDescription,
      coverImageDescription: bookProducts.coverImageDescription,
      characterId: generatedBooks.characterId,
      characterName: characters.name,
      characterImagePath: characters.generatedPortraitPath,
      rawCoverImagePath: generatedBooks.rawCoverImagePath,
      coverImagePath: generatedBooks.coverImagePath,
      rawBackCoverImagePath: generatedBooks.rawBackCoverImagePath,
      backCoverImagePath: generatedBooks.backCoverImagePath,
      updatedAt: generatedBooks.updatedAt,
    })
    .from(generatedBooks)
    .innerJoin(bookProducts, eq(bookProducts.id, generatedBooks.bookProductId))
    .innerJoin(characters, eq(characters.id, generatedBooks.characterId))
    .where(eq(generatedBooks.id, generatedBookId))
    .limit(1);

  if (!book) {
    return null;
  }

  const pages = await db
    .select({
      id: generatedBookPages.id,
      pageNumber: generatedBookPages.pageNumber,
      rawImagePath: generatedBookPages.rawImagePath,
      imagePath: generatedBookPages.imagePath,
      updatedAt: generatedBookPages.updatedAt,
    })
    .from(generatedBookPages)
    .where(eq(generatedBookPages.generatedBookId, generatedBookId))
    .orderBy(asc(generatedBookPages.pageNumber));

  return { book, pages };
}

export async function listGeneratedBookPagesByNumbers({
  generatedBookId,
  pageNumbers,
}: {
  generatedBookId: string;
  pageNumbers: number[];
}) {
  if (!pageNumbers.length) {
    return [];
  }
  return db
    .select()
    .from(generatedBookPages)
    .where(
      and(
        eq(generatedBookPages.generatedBookId, generatedBookId),
        inArray(generatedBookPages.pageNumber, pageNumbers),
      ),
    )
    .orderBy(asc(generatedBookPages.pageNumber));
}
