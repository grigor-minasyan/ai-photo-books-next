"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getBookProductPageTemplate } from "@/lib/db/queries/admin/book-products";
import { getGeneratedBookAdminDetail } from "@/lib/db/queries/admin/generated-books";
import { db } from "@/lib/db/client";
import { generatedBookPages, generatedBooks } from "@/lib/db/schema";
import {
  readImageBufferFromPathOrUrl,
  toBase64Image,
} from "@/lib/services/image-io/image-io.service";
import { generateGenericImage } from "@/lib/services/image-generation/image-generation.service";
import {
  uploadBufferToR2,
  buildR2ObjectKey,
} from "@/lib/services/storage/r2.service";
import { assertAdmin } from "./_auth";
import { declineArmenianName } from "../../../../lib/services/armenian/name-declension";
import path from "path";

const singlePageSchema = z.object({
  generatedBookId: z.string().regex(/^[0-9a-f-]{36}$/),
  pageNumber: z.number().int().min(1),
  locale: z.string().min(2),
});

const pageBulkSchema = z.object({
  generatedBookId: z.string().uuid(),
  pageNumbers: z.array(z.number().int().min(1)).min(1),
  locale: z.string().min(2),
});

const assetSchema = z.object({
  generatedBookId: z.string().uuid(),
  locale: z.string().min(2),
});

function resolveTextOverlayOptions() {
  return {
    fontPath: path.join(
      process.cwd(),
      "lib/fonts/NotoSansArmenian-VariableFont_wdth,wght.ttf",
    ),
    fontFamily: "Noto Sans Armenian",
  };
}

async function getTextOverlayService() {
  return import("@/lib/services/text-overlay/text-overlay.service");
}

async function getDetailOrThrow(generatedBookId: string) {
  const detail = await getGeneratedBookAdminDetail(generatedBookId);
  if (!detail) {
    throw new Error("Generated book not found");
  }
  return detail;
}

async function getCharacterReference(
  detail: Awaited<ReturnType<typeof getGeneratedBookAdminDetail>>,
) {
  const imagePath = detail?.book.characterImagePath;
  if (!imagePath) {
    return null;
  }
  const characterBuffer = await readImageBufferFromPathOrUrl(imagePath);
  return toBase64Image(characterBuffer);
}

async function saveRawCover(generatedBookId: string, rawBuffer: Buffer) {
  const key = buildR2ObjectKey({
    generatedBookId,
    variant: "raw",
    assetType: "cover",
  });
  const uploaded = await uploadBufferToR2({ body: rawBuffer, key });
  await db
    .update(generatedBooks)
    .set({ rawCoverImagePath: uploaded.key, updatedAt: new Date() })
    .where(eq(generatedBooks.id, generatedBookId));
}

async function saveFinalCover(generatedBookId: string, finalBuffer: Buffer) {
  const key = buildR2ObjectKey({
    generatedBookId,
    variant: "final",
    assetType: "cover",
  });
  const uploaded = await uploadBufferToR2({ body: finalBuffer, key });
  await db
    .update(generatedBooks)
    .set({ coverImagePath: uploaded.key, updatedAt: new Date() })
    .where(eq(generatedBooks.id, generatedBookId));
}

async function saveRawBackCover(generatedBookId: string, rawBuffer: Buffer) {
  const key = buildR2ObjectKey({
    generatedBookId,
    variant: "raw",
    assetType: "back-cover",
  });
  const uploaded = await uploadBufferToR2({ body: rawBuffer, key });
  await db
    .update(generatedBooks)
    .set({ rawBackCoverImagePath: uploaded.key, updatedAt: new Date() })
    .where(eq(generatedBooks.id, generatedBookId));
}

async function saveFinalBackCover(
  generatedBookId: string,
  finalBuffer: Buffer,
) {
  const key = buildR2ObjectKey({
    generatedBookId,
    variant: "final",
    assetType: "back-cover",
  });
  const uploaded = await uploadBufferToR2({ body: finalBuffer, key });
  await db
    .update(generatedBooks)
    .set({ backCoverImagePath: uploaded.key, updatedAt: new Date() })
    .where(eq(generatedBooks.id, generatedBookId));
}

async function saveRawPage({
  generatedBookId,
  pageNumber,
  rawBuffer,
}: {
  generatedBookId: string;
  pageNumber: number;
  rawBuffer: Buffer;
}) {
  const key = buildR2ObjectKey({
    generatedBookId,
    pageNumber,
    variant: "raw",
    assetType: "page",
  });
  const uploaded = await uploadBufferToR2({ body: rawBuffer, key });
  await db
    .update(generatedBookPages)
    .set({ rawImagePath: uploaded.key, updatedAt: new Date() })
    .where(
      and(
        eq(generatedBookPages.generatedBookId, generatedBookId),
        eq(generatedBookPages.pageNumber, pageNumber),
      ),
    );
}

async function saveFinalPage({
  generatedBookId,
  pageNumber,
  finalBuffer,
}: {
  generatedBookId: string;
  pageNumber: number;
  finalBuffer: Buffer;
}) {
  const key = buildR2ObjectKey({
    generatedBookId,
    pageNumber,
    variant: "final",
    assetType: "page",
  });
  const uploaded = await uploadBufferToR2({ body: finalBuffer, key });
  await db
    .update(generatedBookPages)
    .set({ imagePath: uploaded.key, updatedAt: new Date() })
    .where(
      and(
        eq(generatedBookPages.generatedBookId, generatedBookId),
        eq(generatedBookPages.pageNumber, pageNumber),
      ),
    );
}

export async function generateRawCoverAction(input: unknown) {
  await assertAdmin();
  const parsed = assetSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);
  const characterReference = await getCharacterReference(detail);

  const rawBuffer = await generateGenericImage({
    description: detail.book.coverImageDescription,
    characterReference: characterReference ?? undefined,
  });

  await saveRawCover(parsed.generatedBookId, rawBuffer);
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateFinalCoverAction(input: unknown) {
  await assertAdmin();
  const parsed = assetSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);
  if (!detail.book.rawCoverImagePath) {
    throw new Error("Generate raw cover image first");
  }

  const rawBuffer = await readImageBufferFromPathOrUrl(
    detail.book.rawCoverImagePath,
  );
  const { addCurvedTitleForPage } = await getTextOverlayService();
  const finalBuffer = await addCurvedTitleForPage(
    rawBuffer,
    declineArmenianName(
      detail.book.bookTitleTemplate,
      detail.book.characterName,
    ),
    resolveTextOverlayOptions(),
  );

  await saveFinalCover(parsed.generatedBookId, finalBuffer);
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateRawBackCoverAction(input: unknown) {
  await assertAdmin();
  const parsed = assetSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);
  const characterReference = await getCharacterReference(detail);

  const rawBuffer = await generateGenericImage({
    description: detail.book.backCoverImageDescription,
    characterReference: characterReference ?? undefined,
  });

  await saveRawBackCover(parsed.generatedBookId, rawBuffer);
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateFinalBackCoverAction(input: unknown) {
  await assertAdmin();
  const parsed = assetSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);
  if (!detail.book.rawBackCoverImagePath) {
    throw new Error("Generate raw back cover image first");
  }

  const rawBuffer = await readImageBufferFromPathOrUrl(
    detail.book.rawBackCoverImagePath,
  );
  const { addTextBoxForBackCover } = await getTextOverlayService();
  const finalBuffer = await addTextBoxForBackCover(
    rawBuffer,
    declineArmenianName(
      detail.book.endingTextTemplate,
      detail.book.characterName,
    ),
    resolveTextOverlayOptions(),
  );

  await saveFinalBackCover(parsed.generatedBookId, finalBuffer);
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateRawPageAction(input: unknown) {
  await assertAdmin();
  const parsed = singlePageSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);

  const pageTemplate = await getBookProductPageTemplate({
    bookProductId: detail.book.bookProductId,
    pageNumber: parsed.pageNumber,
  });
  if (!pageTemplate?.imageDescription) {
    throw new Error(`Missing image description for page ${parsed.pageNumber}`);
  }

  const characterReference = await getCharacterReference(detail);
  const rawBuffer = await generateGenericImage({
    description: pageTemplate.imageDescription,
    characterReference: characterReference ?? undefined,
  });

  await saveRawPage({
    generatedBookId: parsed.generatedBookId,
    pageNumber: parsed.pageNumber,
    rawBuffer,
  });
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateFinalPageAction(input: unknown) {
  await assertAdmin();
  const parsed = singlePageSchema.parse(input);
  const detail = await getDetailOrThrow(parsed.generatedBookId);

  const currentPage = detail.pages.find(
    (page) => page.pageNumber === parsed.pageNumber,
  );
  if (!currentPage?.rawImagePath) {
    throw new Error(`Generate raw image for page ${parsed.pageNumber} first`);
  }

  const pageTemplate = await getBookProductPageTemplate({
    bookProductId: detail.book.bookProductId,
    pageNumber: parsed.pageNumber,
  });
  if (!pageTemplate?.textTemplate) {
    throw new Error(`Missing page text template for page ${parsed.pageNumber}`);
  }

  const rawBuffer = await readImageBufferFromPathOrUrl(
    currentPage.rawImagePath,
  );
  const { addStylizedTextOverlayForPage } = await getTextOverlayService();
  const finalBuffer = await addStylizedTextOverlayForPage(
    rawBuffer,
    declineArmenianName(pageTemplate.textTemplate, detail.book.characterName),
    resolveTextOverlayOptions(),
  );

  await saveFinalPage({
    generatedBookId: parsed.generatedBookId,
    pageNumber: parsed.pageNumber,
    finalBuffer,
  });
  revalidatePath(
    `/${parsed.locale}/admin/generated-books/${parsed.generatedBookId}`,
  );
}

export async function generateRawPagesBulkAction(input: unknown) {
  await assertAdmin();
  const parsed = pageBulkSchema.parse(input);
  for (const pageNumber of parsed.pageNumbers) {
    await generateRawPageAction({
      generatedBookId: parsed.generatedBookId,
      pageNumber,
      locale: parsed.locale,
    });
  }
}

export async function generateFinalPagesBulkAction(input: unknown) {
  await assertAdmin();
  const parsed = pageBulkSchema.parse(input);
  for (const pageNumber of parsed.pageNumbers) {
    await generateFinalPageAction({
      generatedBookId: parsed.generatedBookId,
      pageNumber,
      locale: parsed.locale,
    });
  }
}
