import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import {
  bookProductLocalizations,
  bookProductVariationPricing,
  bookProductPages,
  bookProducts,
  bookVariations,
  generatedBookPages,
  generatedBooks,
} from "@/lib/db/schema";

const IMAGE_PLACEHOLDER_PATH = "/file.svg";
export type ProductLocale = "en" | "hy";

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
  title: string;
  coverImagePath: string;
  rawCoverImagePath: string | null;
};

export async function listHomepageBookProducts(
  locale: ProductLocale,
): Promise<HomepageBookProduct[]> {
  const rows = await db
    .select({
      id: bookProducts.id,
      slug: bookProducts.slug,
      titleTemplate: bookProducts.titleTemplate,
      localizedTitle: bookProductLocalizations.title,
      rawCoverImagePath: generatedBooks.coverImagePath,
    })
    .from(bookProducts)
    .leftJoin(
      bookProductLocalizations,
      and(
        eq(bookProductLocalizations.bookProductId, bookProducts.id),
        eq(bookProductLocalizations.locale, locale),
      ),
    )
    .leftJoin(
      generatedBooks,
      eq(bookProducts.sourceGeneratedBookId, generatedBooks.id),
    )
    .where(eq(bookProducts.isActive, true))
    .orderBy(asc(bookProducts.createdAt));

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.localizedTitle ?? row.titleTemplate,
    rawCoverImagePath: row.rawCoverImagePath,
    coverImagePath: normalizeProductImagePath(row.rawCoverImagePath),
  }));
}

export type BookProductDetails = {
  id: string;
  slug: string;
  title: string;
  description: string;
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
  variationPricing: Array<{
    variationKey: "hardcover" | "softcover";
    variationLabel: string;
    pageCount: number;
    originalPriceCents: number;
    reducedPriceCents: number;
  }>;
};

export async function getBookProductBySlug(
  slug: string,
  locale: ProductLocale,
  fallbackDescription: string,
): Promise<BookProductDetails | null> {
  const [productRow] = await db
    .select({
      id: bookProducts.id,
      slug: bookProducts.slug,
      titleTemplate: bookProducts.titleTemplate,
      localizedTitle: bookProductLocalizations.title,
      localizedDescription: bookProductLocalizations.description,
      coverImageDescription: bookProducts.coverImageDescription,
      endingTextTemplate: bookProducts.endingTextTemplate,
      backCoverImageDescription: bookProducts.backCoverImageDescription,
      sourceGeneratedBookId: bookProducts.sourceGeneratedBookId,
      rawCoverImagePath: generatedBooks.coverImagePath,
    })
    .from(bookProducts)
    .leftJoin(
      bookProductLocalizations,
      and(
        eq(bookProductLocalizations.bookProductId, bookProducts.id),
        eq(bookProductLocalizations.locale, locale),
      ),
    )
    .leftJoin(
      generatedBooks,
      eq(bookProducts.sourceGeneratedBookId, generatedBooks.id),
    )
    .where(and(eq(bookProducts.slug, slug), eq(bookProducts.isActive, true)))
    .limit(1);

  if (!productRow) {
    return null;
  }

  const title = productRow.localizedTitle ?? productRow.titleTemplate;
  const description = productRow.localizedDescription ?? fallbackDescription;

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

  const variationPricingRows = await db
    .select({
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
    .where(eq(bookProductVariationPricing.bookProductId, productRow.id));

  const variationSortOrder: Record<"hardcover" | "softcover", number> = {
    hardcover: 0,
    softcover: 1,
  };

  const variationPricing = variationPricingRows.sort(
    (a, b) => variationSortOrder[a.variationKey] - variationSortOrder[b.variationKey],
  );

  return {
    id: productRow.id,
    slug: productRow.slug,
    title,
    description,
    coverImageDescription: productRow.coverImageDescription,
    endingTextTemplate: productRow.endingTextTemplate,
    backCoverImageDescription: productRow.backCoverImageDescription,
    sourceGeneratedBookId: productRow.sourceGeneratedBookId,
    rawCoverImagePath: productRow.rawCoverImagePath,
    coverImagePath: normalizeProductImagePath(productRow.rawCoverImagePath),
    templatePages,
    sourcePages,
    variationPricing,
  };
}
