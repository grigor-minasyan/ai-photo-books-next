"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  getVariationPageCount,
} from "@/lib/db/queries/admin/book-products";
import {
  getGeneratedBookAdminDetail,
  listAdminGeneratedBooks,
} from "@/lib/db/queries/admin/generated-books";
import { db } from "@/lib/db/client";
import {
  bookProducts,
  bookVariations,
  characters,
  generatedBookPages,
  generatedBooks,
} from "@/lib/db/schema";
import { assertAdmin } from "./_auth";

const createGeneratedBookSchema = z.object({
  bookProductId: z.string().uuid(),
  characterId: z.string().uuid(),
  variationId: z.string().uuid(),
  status: z
    .enum(["draft", "processing", "ready", "failed", "archived"])
    .default("draft"),
  locale: z.string().min(2),
});

const updateGeneratedBookStatusSchema = z.object({
  generatedBookId: z.string().uuid(),
  status: z.enum(["draft", "processing", "ready", "failed", "archived"]),
  locale: z.string().min(2),
});

export async function listAdminGeneratedBooksAction() {
  await assertAdmin();
  return listAdminGeneratedBooks();
}

export async function getAdminGeneratedBookAction(generatedBookId: string) {
  await assertAdmin();
  return getGeneratedBookAdminDetail(generatedBookId);
}

export async function getAdminGeneratedBookFormOptionsAction() {
  await assertAdmin();
  const [products, allCharacters, variations] = await Promise.all([
    db
      .select({ id: bookProducts.id, slug: bookProducts.slug, title: bookProducts.titleTemplate })
      .from(bookProducts)
      .orderBy(asc(bookProducts.slug)),
    db
      .select({ id: characters.id, name: characters.name, slug: characters.slug })
      .from(characters)
      .orderBy(asc(characters.slug)),
    db
      .select({
        id: bookVariations.id,
        key: bookVariations.key,
        label: bookVariations.label,
        pageCount: bookVariations.pageCount,
      })
      .from(bookVariations)
      .orderBy(asc(bookVariations.key)),
  ]);

  return { products, characters: allCharacters, variations };
}

export async function createGeneratedBookAction(input: unknown) {
  await assertAdmin();
  const parsed = createGeneratedBookSchema.parse(input);
  const pageCount = await getVariationPageCount(parsed.variationId);
  if (!pageCount) {
    throw new Error("Selected variation not found");
  }

  const now = new Date();
  const [created] = await db
    .insert(generatedBooks)
    .values({
      bookProductId: parsed.bookProductId,
      characterId: parsed.characterId,
      status: parsed.status,
      rawCoverImagePath: null,
      coverImagePath: null,
      rawBackCoverImagePath: null,
      backCoverImagePath: null,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: generatedBooks.id });

  await db.insert(generatedBookPages).values(
    Array.from({ length: pageCount }, (_, index) => ({
      generatedBookId: created.id,
      pageNumber: index + 1,
      rawImagePath: null,
      imagePath: null,
      createdAt: now,
      updatedAt: now,
    })),
  );

  revalidatePath(`/${parsed.locale}/admin/generated-books`);
  return created;
}

export async function updateGeneratedBookStatusAction(input: unknown) {
  await assertAdmin();
  const parsed = updateGeneratedBookStatusSchema.parse(input);

  const [updated] = await db
    .update(generatedBooks)
    .set({
      status: parsed.status,
      updatedAt: new Date(),
    })
    .where(eq(generatedBooks.id, parsed.generatedBookId))
    .returning({ id: generatedBooks.id });

  if (!updated) {
    throw new Error("Generated book not found");
  }

  revalidatePath(`/${parsed.locale}/admin/generated-books`);
  revalidatePath(`/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`);
  return updated;
}
