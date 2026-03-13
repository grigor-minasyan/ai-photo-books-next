"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  listPromptTemplates,
  updatePromptTemplateByKey,
} from "@/lib/db/queries/admin/prompts";
import { assertAdmin } from "./_auth";

const updatePromptTemplateSchema = z.object({
  key: z.enum([
    "generate_book",
    "generate_character_from_image",
    "generate_generic_image",
    "generate_image_based_on_another",
  ]),
  promptText: z.string().min(1),
  isActive: z.boolean().optional(),
  locale: z.string().min(2),
});

export async function getAdminPromptTemplatesAction() {
  await assertAdmin();
  return listPromptTemplates();
}

export async function updatePromptTemplateAction(input: unknown) {
  await assertAdmin();
  const parsed = updatePromptTemplateSchema.parse(input);
  const updated = await updatePromptTemplateByKey({
    key: parsed.key,
    promptText: parsed.promptText,
    isActive: parsed.isActive,
  });

  revalidatePath(`/${parsed.locale}/admin/prompts`);
  return updated;
}
