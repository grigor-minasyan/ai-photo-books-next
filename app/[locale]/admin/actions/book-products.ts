"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  getAdminBookProductById,
  listAdminBookProducts,
} from "@/lib/db/queries/admin/book-products";
import { db } from "@/lib/db/client";
import {
  bookProductLocalizations,
  bookProductPages,
  bookProductVariationPricing,
  bookProducts,
} from "@/lib/db/schema";
import { assertAdmin } from "./_auth";

const baseBookProductSchema = z.object({
  slug: z.string().min(1),
  titleTemplate: z.string().min(1),
  coverImageDescription: z.string().min(1),
  endingTextTemplate: z.string().min(1),
  backCoverImageDescription: z.string().min(1),
  isActive: z.boolean().default(true),
  locale: z.string().min(2),
});

const localizationSchema = z.object({
  locale: z.enum(["en", "hy"]),
  title: z.string().min(1),
  description: z.string().min(1),
});

const variationPricingSchema = z.object({
  bookVariationId: z.string().uuid(),
  originalPriceCents: z.number().int().min(1000),
  reducedPriceCents: z.number().int().min(1000),
});

const createBookProductSchema = baseBookProductSchema.extend({
  localizations: z.array(localizationSchema).optional(),
  variationPricing: z.array(variationPricingSchema).optional(),
});

const updateBookProductSchema = createBookProductSchema.extend({
  bookProductId: z.string().uuid(),
});

const upsertBookProductPageSchema = z.object({
  bookProductId: z.string().uuid(),
  pageNumber: z.number().int().min(1),
  textTemplate: z.string().min(1),
  imageDescription: z.string().nullable(),
  locale: z.string().min(2),
});

export async function listAdminBookProductsAction() {
  await assertAdmin();
  return listAdminBookProducts();
}

export async function getAdminBookProductAction(bookProductId: string) {
  await assertAdmin();
  return getAdminBookProductById(bookProductId);
}

export async function createBookProductAction(input: unknown) {
  await assertAdmin();
  const parsed = createBookProductSchema.parse(input);
  const now = new Date();

  const [created] = await db
    .insert(bookProducts)
    .values({
      slug: parsed.slug,
      titleTemplate: parsed.titleTemplate,
      coverImageDescription: parsed.coverImageDescription,
      endingTextTemplate: parsed.endingTextTemplate,
      backCoverImageDescription: parsed.backCoverImageDescription,
      isActive: parsed.isActive,
      sourceGeneratedBookId: null,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: bookProducts.id });

  if (parsed.localizations?.length) {
    await db.insert(bookProductLocalizations).values(
      parsed.localizations.map((item) => ({
        bookProductId: created.id,
        locale: item.locale,
        title: item.title,
        description: item.description,
        createdAt: now,
        updatedAt: now,
      })),
    );
  }

  if (parsed.variationPricing?.length) {
    await db.insert(bookProductVariationPricing).values(
      parsed.variationPricing.map((item) => ({
        bookProductId: created.id,
        bookVariationId: item.bookVariationId,
        originalPriceCents: item.originalPriceCents,
        reducedPriceCents: item.reducedPriceCents,
        createdAt: now,
        updatedAt: now,
      })),
    );
  }

  revalidatePath(`/${parsed.locale}/admin/books`);
  return created;
}

export async function updateBookProductAction(input: unknown) {
  await assertAdmin();
  const parsed = updateBookProductSchema.parse(input);
  const now = new Date();

  const [updated] = await db
    .update(bookProducts)
    .set({
      slug: parsed.slug,
      titleTemplate: parsed.titleTemplate,
      coverImageDescription: parsed.coverImageDescription,
      endingTextTemplate: parsed.endingTextTemplate,
      backCoverImageDescription: parsed.backCoverImageDescription,
      isActive: parsed.isActive,
      updatedAt: now,
    })
    .where(eq(bookProducts.id, parsed.bookProductId))
    .returning({ id: bookProducts.id });

  if (!updated) {
    throw new Error("Book product not found");
  }

  if (parsed.localizations) {
    for (const item of parsed.localizations) {
      await db
        .insert(bookProductLocalizations)
        .values({
          bookProductId: parsed.bookProductId,
          locale: item.locale,
          title: item.title,
          description: item.description,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            bookProductLocalizations.bookProductId,
            bookProductLocalizations.locale,
          ],
          set: {
            title: item.title,
            description: item.description,
            updatedAt: now,
          },
        });
    }
  }

  if (parsed.variationPricing) {
    for (const item of parsed.variationPricing) {
      await db
        .insert(bookProductVariationPricing)
        .values({
          bookProductId: parsed.bookProductId,
          bookVariationId: item.bookVariationId,
          originalPriceCents: item.originalPriceCents,
          reducedPriceCents: item.reducedPriceCents,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            bookProductVariationPricing.bookProductId,
            bookProductVariationPricing.bookVariationId,
          ],
          set: {
            originalPriceCents: item.originalPriceCents,
            reducedPriceCents: item.reducedPriceCents,
            updatedAt: now,
          },
        });
    }
  }

  revalidatePath(`/${parsed.locale}/admin/books`);
  revalidatePath(`/${parsed.locale}/admin/books/${parsed.bookProductId}`);
  return updated;
}

export async function upsertBookProductPageAction(input: unknown) {
  await assertAdmin();
  const parsed = upsertBookProductPageSchema.parse(input);
  const now = new Date();

  await db
    .insert(bookProductPages)
    .values({
      bookProductId: parsed.bookProductId,
      pageNumber: parsed.pageNumber,
      textTemplate: parsed.textTemplate,
      imageDescription: parsed.imageDescription,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [bookProductPages.bookProductId, bookProductPages.pageNumber],
      set: {
        textTemplate: parsed.textTemplate,
        imageDescription: parsed.imageDescription,
        updatedAt: now,
      },
    });

  revalidatePath(`/${parsed.locale}/admin/books/${parsed.bookProductId}`);
}

export async function deleteBookProductPageAction(input: {
  bookProductId: string;
  pageNumber: number;
  locale: string;
}) {
  await assertAdmin();
  await db
    .delete(bookProductPages)
    .where(
      and(
        eq(bookProductPages.bookProductId, input.bookProductId),
        eq(bookProductPages.pageNumber, input.pageNumber),
      ),
    );
  revalidatePath(`/${input.locale}/admin/books/${input.bookProductId}`);
}
