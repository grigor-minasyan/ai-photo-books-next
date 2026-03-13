import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { promptTemplates } from "@/lib/db/schema";

export async function listPromptTemplates() {
  return db
    .select({
      id: promptTemplates.id,
      key: promptTemplates.key,
      promptText: promptTemplates.promptText,
      isActive: promptTemplates.isActive,
      updatedAt: promptTemplates.updatedAt,
    })
    .from(promptTemplates)
    .orderBy(asc(promptTemplates.key));
}

export async function updatePromptTemplateByKey({
  key,
  promptText,
  isActive,
}: {
  key: "generate_book" | "generate_character_from_image" | "generate_generic_image" | "generate_image_based_on_another";
  promptText: string;
  isActive?: boolean;
}) {
  const [updated] = await db
    .update(promptTemplates)
    .set({
      promptText,
      ...(typeof isActive === "boolean" ? { isActive } : {}),
      updatedAt: new Date(),
    })
    .where(eq(promptTemplates.key, key))
    .returning();

  return updated ?? null;
}
