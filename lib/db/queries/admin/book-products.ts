import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import {
  bookProductLocalizations,
  bookProductPages,
  bookProductVariationPricing,
  bookProducts,
  bookVariations,
} from "@/lib/db/schema";

export async function listAdminBookProducts() {
  return db
    .select({
      id: bookProducts.id,
      slug: bookProducts.slug,
      titleTemplate: bookProducts.titleTemplate,
      isActive: bookProducts.isActive,
      sourceGeneratedBookId: bookProducts.sourceGeneratedBookId,
      updatedAt: bookProducts.updatedAt,
    })
    .from(bookProducts)
    .orderBy(asc(bookProducts.createdAt));
}

export async function getAdminBookProductById(bookProductId: string) {
  const [product] = await db
    .select()
    .from(bookProducts)
    .where(eq(bookProducts.id, bookProductId))
    .limit(1);

  if (!product) {
    return null;
  }

  const [localizations, pages, variationPricing] = await Promise.all([
    db
      .select()
      .from(bookProductLocalizations)
      .where(eq(bookProductLocalizations.bookProductId, bookProductId))
      .orderBy(asc(bookProductLocalizations.locale)),
    db
      .select()
      .from(bookProductPages)
      .where(eq(bookProductPages.bookProductId, bookProductId))
      .orderBy(asc(bookProductPages.pageNumber)),
    db
      .select({
        id: bookProductVariationPricing.id,
        bookVariationId: bookProductVariationPricing.bookVariationId,
        variationKey: bookVariations.key,
        variationLabel: bookVariations.label,
        pageCount: bookVariations.pageCount,
        originalPriceCents: bookProductVariationPricing.originalPriceCents,
        reducedPriceCents: bookProductVariationPricing.reducedPriceCents,
      })
      .from(bookProductVariationPricing)
      .innerJoin(
        bookVariations,
        eq(bookVariations.id, bookProductVariationPricing.bookVariationId),
      )
      .where(eq(bookProductVariationPricing.bookProductId, bookProductId)),
  ]);

  return {
    product,
    localizations,
    pages,
    variationPricing,
  };
}

export async function getVariationPageCount(variationId: string): Promise<number | null> {
  const [variation] = await db
    .select({ pageCount: bookVariations.pageCount })
    .from(bookVariations)
    .where(eq(bookVariations.id, variationId))
    .limit(1);

  return variation?.pageCount ?? null;
}

export async function getBookProductPageTemplate({
  bookProductId,
  pageNumber,
}: {
  bookProductId: string;
  pageNumber: number;
}) {
  const [page] = await db
    .select({
      textTemplate: bookProductPages.textTemplate,
      imageDescription: bookProductPages.imageDescription,
    })
    .from(bookProductPages)
    .where(
      and(
        eq(bookProductPages.bookProductId, bookProductId),
        eq(bookProductPages.pageNumber, pageNumber),
      ),
    )
    .limit(1);

  return page ?? null;
}
