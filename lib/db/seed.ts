import { eq } from "drizzle-orm";

import {
  CHARACTER_MAP,
  generatedBooks,
} from "../../copied-base-server-refs/src/constants";
import { db } from "./client";
import {
  bookProductVariationPricing,
  bookProductPages,
  bookProducts,
  bookVariations,
  characters,
  generatedBookPages,
  generatedBooks as generatedBooksTable,
  promptTemplates,
} from "./schema";

const PRODUCT_SLUGS = [
  "adventures-in-armenia",
  "magic-paintbrush",
  "city-of-toys",
] as const;

const SOURCE_GENERATED_BOOK_IDS = [
  "11111111-1111-1111-1111-111111111101",
  "11111111-1111-1111-1111-111111111102",
  "11111111-1111-1111-1111-111111111103",
] as const;

const BOOK_VARIATION_SEEDS = [
  {
    key: "hardcover" as const,
    label: "Hardcover",
    pageCount: 30,
  },
  {
    key: "softcover" as const,
    label: "Softcover",
    pageCount: 30,
  },
] as const;

const DEFAULT_ORIGINAL_PRICE_CENTS = 4499;
const DEFAULT_REDUCED_PRICE_CENTS = 3499;

const PROMPT_SEEDS = [
  {
    key: "generate_book" as const,
    promptText: `Generate a children's book where a user uploads a kid's photo and provides their name. The kid is the main character. The text must be Armenian, and every mention of the name must use {{NAME}}. Return title, cover image description, exactly 30 pages with page text + image descriptions, ending text, and back cover image description.`,
  },
  {
    key: "generate_character_from_image" as const,
    promptText: `Create a full-body standing character from the uploaded image. Keep facial features very similar, character should face the camera with a slight smile on a white background, in soft digital storybook illustration style.`,
  },
  {
    key: "generate_generic_image" as const,
    promptText: `Generate a full-page image from the provided description in soft digital storybook style. If a character reference image is provided, the main character should match it.`,
  },
  {
    key: "generate_image_based_on_another" as const,
    promptText: `Given base scene image, base character image, and new character image, regenerate the same scene while replacing only the character with the new one. Keep composition, background, style, lighting, and mood unchanged.`,
  },
];

async function seedBookProductsAndPages() {
  const now = new Date();

  for (const [bookIndex, book] of generatedBooks.entries()) {
    const slug = PRODUCT_SLUGS[bookIndex] ?? `book-${bookIndex + 1}`;

    const [product] = await db
      .insert(bookProducts)
      .values({
        slug,
        titleTemplate: book.title,
        coverImageDescription: book.coverImageDescription,
        endingTextTemplate: book.endingText,
        backCoverImageDescription: book.backCoverImageDescription,
        sourceGeneratedBookId: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: bookProducts.slug,
        set: {
          titleTemplate: book.title,
          coverImageDescription: book.coverImageDescription,
          endingTextTemplate: book.endingText,
          backCoverImageDescription: book.backCoverImageDescription,
          sourceGeneratedBookId: null,
          isActive: true,
          updatedAt: now,
        },
      })
      .returning({ id: bookProducts.id });

    for (const [pageIndex, page] of book.pages.entries()) {
      await db
        .insert(bookProductPages)
        .values({
          bookProductId: product.id,
          pageNumber: pageIndex + 1,
          textTemplate: page.text,
          imageDescription: page.imageDescription,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [bookProductPages.bookProductId, bookProductPages.pageNumber],
          set: {
            textTemplate: page.text,
            imageDescription: page.imageDescription,
            updatedAt: now,
          },
        });
    }
  }
}

async function seedPromptTemplates() {
  const now = new Date();

  for (const prompt of PROMPT_SEEDS) {
    await db
      .insert(promptTemplates)
      .values({
        key: prompt.key,
        promptText: prompt.promptText,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: promptTemplates.key,
        set: {
          promptText: prompt.promptText,
          isActive: true,
          updatedAt: now,
        },
      });
  }
}

async function seedBookVariations() {
  const now = new Date();

  for (const variation of BOOK_VARIATION_SEEDS) {
    await db
      .insert(bookVariations)
      .values({
        key: variation.key,
        label: variation.label,
        pageCount: variation.pageCount,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: bookVariations.key,
        set: {
          label: variation.label,
          pageCount: variation.pageCount,
          updatedAt: now,
        },
      });
  }
}

async function seedBookVariationPricing() {
  const now = new Date();
  const products = await db.select({ id: bookProducts.id }).from(bookProducts);

  const variations = await db
    .select({
      id: bookVariations.id,
      key: bookVariations.key,
    })
    .from(bookVariations);

  for (const product of products) {
    for (const variation of variations) {
      await db
        .insert(bookProductVariationPricing)
        .values({
          bookProductId: product.id,
          bookVariationId: variation.id,
          originalPriceCents: DEFAULT_ORIGINAL_PRICE_CENTS,
          reducedPriceCents: DEFAULT_REDUCED_PRICE_CENTS,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            bookProductVariationPricing.bookProductId,
            bookProductVariationPricing.bookVariationId,
          ],
          set: {
            originalPriceCents: DEFAULT_ORIGINAL_PRICE_CENTS,
            reducedPriceCents: DEFAULT_REDUCED_PRICE_CENTS,
            updatedAt: now,
          },
        });
    }
  }
}

async function seedCharacters() {
  const now = new Date();

  for (const character of Object.values(CHARACTER_MAP)) {
    await db
      .insert(characters)
      .values({
        slug: character.id,
        name: character.name,
        sourcePortraitPath: character.imagePath,
        generatedPortraitPath: character.imagePath,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: characters.slug,
        set: {
          name: character.name,
          sourcePortraitPath: character.imagePath,
          generatedPortraitPath: character.imagePath,
          isActive: true,
          updatedAt: now,
        },
      });
  }
}

async function seedGeneratedSourceBooksAndPages() {
  const now = new Date();
  const sourceCharacterSlug = "alec";

  const [sourceCharacter] = await db
    .select({ id: characters.id })
    .from(characters)
    .where(eq(characters.slug, sourceCharacterSlug))
    .limit(1);

  if (!sourceCharacter) {
    throw new Error(
      `Character "${sourceCharacterSlug}" not found during seeding`,
    );
  }

  for (const [bookIndex] of generatedBooks.entries()) {
    const productSlug = PRODUCT_SLUGS[bookIndex] ?? `book-${bookIndex + 1}`;

    const [product] = await db
      .select({ id: bookProducts.id })
      .from(bookProducts)
      .where(eq(bookProducts.slug, productSlug))
      .limit(1);

    if (!product) {
      throw new Error(`Book product "${productSlug}" not found during seeding`);
    }

    const sourceGeneratedBookId =
      SOURCE_GENERATED_BOOK_IDS[bookIndex] ??
      `11111111-1111-1111-1111-1111111111${bookIndex + 1}`;

    const [sourceGeneratedBook] = await db
      .insert(generatedBooksTable)
      .values({
        id: sourceGeneratedBookId,
        bookProductId: product.id,
        characterId: sourceCharacter.id,
        status: "ready",
        coverImagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/cover-front.jpg`,
        backCoverImagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/cover-back.jpg`,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: generatedBooksTable.id,
        set: {
          status: "ready",
          coverImagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/cover-front.jpg`,
          backCoverImagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/cover-back.jpg`,
          updatedAt: now,
        },
      })
      .returning({ id: generatedBooksTable.id });

    for (let pageNumber = 1; pageNumber <= 30; pageNumber += 1) {
      const pageIndex = pageNumber - 1;
      const page = generatedBooks[bookIndex]?.pages[pageIndex];

      await db
        .insert(generatedBookPages)
        .values({
          generatedBookId: sourceGeneratedBook.id,
          pageNumber,
          imagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/page-${pageIndex}.jpg`,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            generatedBookPages.generatedBookId,
            generatedBookPages.pageNumber,
          ],
          set: {
            imagePath: `./books/${bookIndex}/${sourceCharacterSlug}/original/page-${pageIndex}.jpg`,
            updatedAt: now,
          },
        });
    }

    await db
      .update(bookProducts)
      .set({
        sourceGeneratedBookId: sourceGeneratedBook.id,
        updatedAt: now,
      })
      .where(eq(bookProducts.id, product.id));
  }
}

async function main() {
  await seedBookVariations();
  await seedBookProductsAndPages();
  await seedBookVariationPricing();
  await seedPromptTemplates();
  await seedCharacters();
  await seedGeneratedSourceBooksAndPages();
}

main()
  .then(() => {
    console.log("Database seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database seed failed.", error);
    process.exit(1);
  });
