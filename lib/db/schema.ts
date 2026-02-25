import { relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const promptKeyEnum = pgEnum("prompt_key", [
  "generate_book",
  "generate_character_from_image",
  "generate_generic_image",
  "generate_image_based_on_another",
]);

export const bookLifecycleStatusEnum = pgEnum("book_lifecycle_status", [
  "draft",
  "processing",
  "ready",
  "failed",
  "archived",
]);

export const bookVariationKeyEnum = pgEnum("book_variation_key", [
  "hardcover",
  "softcover",
]);

export const productLocaleEnum = pgEnum("product_locale", ["en", "hy"]);

export const bookProducts = pgTable(
  "book_products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    titleTemplate: text("title_template").notNull(),
    coverImageDescription: text("cover_image_description").notNull(),
    endingTextTemplate: text("ending_text_template").notNull(),
    backCoverImageDescription: text("back_cover_image_description").notNull(),
    sourceGeneratedBookId: uuid("source_generated_book_id").references(
      (): AnyPgColumn => generatedBooks.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("book_products_slug_uidx").on(table.slug),
    uniqueIndex("book_products_source_generated_book_uidx").on(
      table.sourceGeneratedBookId,
    ),
    index("book_products_active_idx").on(table.isActive),
  ],
);

export const bookProductLocalizations = pgTable(
  "book_product_localizations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookProductId: uuid("book_product_id")
      .notNull()
      .references(() => bookProducts.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    locale: productLocaleEnum("locale").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    unique("book_product_localizations_product_locale_unique").on(
      table.bookProductId,
      table.locale,
    ),
    index("book_product_localizations_product_idx").on(table.bookProductId),
    index("book_product_localizations_locale_idx").on(table.locale),
  ],
);

export const bookVariations = pgTable(
  "book_variations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: bookVariationKeyEnum("key").notNull(),
    label: text("label").notNull(),
    pageCount: integer("page_count").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("book_variations_key_uidx").on(table.key),
    check("book_variations_page_count_positive", sql`${table.pageCount} > 0`),
  ],
);

export const bookProductVariationPricing = pgTable(
  "book_product_variation_pricing",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookProductId: uuid("book_product_id")
      .notNull()
      .references(() => bookProducts.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    bookVariationId: uuid("book_variation_id")
      .notNull()
      .references(() => bookVariations.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    originalPriceCents: integer("original_price_cents").notNull(),
    reducedPriceCents: integer("reduced_price_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    unique("book_product_variation_pricing_product_variation_unique").on(
      table.bookProductId,
      table.bookVariationId,
    ),
    index("book_product_variation_pricing_product_idx").on(table.bookProductId),
    index("book_product_variation_pricing_variation_idx").on(
      table.bookVariationId,
    ),
    check(
      "book_product_variation_pricing_original_min",
      sql`${table.originalPriceCents} >= 1000`,
    ),
    check(
      "book_product_variation_pricing_reduced_min",
      sql`${table.reducedPriceCents} >= 1000`,
    ),
    check(
      "book_product_variation_pricing_reduced_lte_original",
      sql`${table.reducedPriceCents} <= ${table.originalPriceCents}`,
    ),
  ],
);

export const bookProductPages = pgTable(
  "book_product_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookProductId: uuid("book_product_id")
      .notNull()
      .references(() => bookProducts.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pageNumber: integer("page_number").notNull(),
    textTemplate: text("text_template").notNull(),
    imageDescription: text("image_description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    unique("book_product_pages_product_page_unique").on(
      table.bookProductId,
      table.pageNumber,
    ),
    index("book_product_pages_product_idx").on(table.bookProductId),
    check(
      "book_product_pages_page_number_positive",
      sql`${table.pageNumber} > 0`,
    ),
  ],
);

export const promptTemplates = pgTable(
  "prompt_templates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: promptKeyEnum("key").notNull(),
    promptText: text("prompt_text").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("prompt_templates_key_uidx").on(table.key),
    index("prompt_templates_active_idx").on(table.isActive),
  ],
);

export const characters = pgTable(
  "characters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    sourcePortraitPath: text("source_portrait_path").notNull(),
    generatedPortraitPath: text("generated_portrait_path"),
    metadataJson: jsonb("metadata_json").$type<Record<string, unknown>>(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("characters_slug_uidx").on(table.slug),
    index("characters_active_idx").on(table.isActive),
  ],
);

export const generatedBooks = pgTable(
  "generated_books",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookProductId: uuid("book_product_id")
      .notNull()
      .references(() => bookProducts.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    characterId: uuid("character_id")
      .notNull()
      .references(() => characters.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    status: bookLifecycleStatusEnum("status").default("draft").notNull(),
    coverImagePath: text("cover_image_path"),
    backCoverImagePath: text("back_cover_image_path"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("generated_books_book_product_idx").on(table.bookProductId),
    index("generated_books_character_idx").on(table.characterId),
    index("generated_books_status_idx").on(table.status),
  ],
);

export const generatedBookPages = pgTable(
  "generated_book_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    generatedBookId: uuid("generated_book_id")
      .notNull()
      .references(() => generatedBooks.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pageNumber: integer("page_number").notNull(),
    imagePath: text("image_path").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    unique("generated_book_pages_book_page_unique").on(
      table.generatedBookId,
      table.pageNumber,
    ),
    check(
      "generated_book_pages_page_number_positive",
      sql`${table.pageNumber} > 0`,
    ),
    index("generated_book_pages_book_idx").on(table.generatedBookId),
  ],
);

export const bookProductsRelations = relations(
  bookProducts,
  ({ many, one }) => ({
    pages: many(bookProductPages),
    localizations: many(bookProductLocalizations),
    variationPricing: many(bookProductVariationPricing),
    generatedBooks: many(generatedBooks, {
      relationName: "bookProductGeneratedBooks",
    }),
    sourceGeneratedBook: one(generatedBooks, {
      fields: [bookProducts.sourceGeneratedBookId],
      references: [generatedBooks.id],
      relationName: "bookProductSourceGeneratedBook",
    }),
  }),
);

export const bookProductLocalizationsRelations = relations(
  bookProductLocalizations,
  ({ one }) => ({
    bookProduct: one(bookProducts, {
      fields: [bookProductLocalizations.bookProductId],
      references: [bookProducts.id],
    }),
  }),
);

export const bookVariationsRelations = relations(bookVariations, ({ many }) => ({
  productPricing: many(bookProductVariationPricing),
}));

export const bookProductVariationPricingRelations = relations(
  bookProductVariationPricing,
  ({ one }) => ({
    bookProduct: one(bookProducts, {
      fields: [bookProductVariationPricing.bookProductId],
      references: [bookProducts.id],
    }),
    bookVariation: one(bookVariations, {
      fields: [bookProductVariationPricing.bookVariationId],
      references: [bookVariations.id],
    }),
  }),
);

export const bookProductPagesRelations = relations(
  bookProductPages,
  ({ one }) => ({
    bookProduct: one(bookProducts, {
      fields: [bookProductPages.bookProductId],
      references: [bookProducts.id],
    }),
  }),
);

export const charactersRelations = relations(characters, ({ many }) => ({
  generatedBooks: many(generatedBooks),
}));

export const generatedBooksRelations = relations(
  generatedBooks,
  ({ one, many }) => ({
    bookProduct: one(bookProducts, {
      fields: [generatedBooks.bookProductId],
      references: [bookProducts.id],
      relationName: "bookProductGeneratedBooks",
    }),
    character: one(characters, {
      fields: [generatedBooks.characterId],
      references: [characters.id],
    }),
    pages: many(generatedBookPages),
    sourcedByProducts: many(bookProducts, {
      relationName: "bookProductSourceGeneratedBook",
    }),
  }),
);

export const generatedBookPagesRelations = relations(
  generatedBookPages,
  ({ one }) => ({
    generatedBook: one(generatedBooks, {
      fields: [generatedBookPages.generatedBookId],
      references: [generatedBooks.id],
    }),
  }),
);
