import { db } from "@/lib/db/client";
import { promptTemplates } from "@/lib/db/schema";
import { generateImageWithGemini, geminiClient } from "@/lib/services/image-generation/gemini-client";
import type { InlineImage } from "@/lib/services/image-generation/types";
import {
  buildGenerateBookPrompt,
  buildGenerateCharacterPrompt,
  buildGenerateGenericImagePrompt,
  buildGenerateImageBasedOnAnotherPrompt,
} from "@/lib/services/prompts/prompt-builders";
import {
  BOOK_PAGE_COUNT,
  generatedBookSchema,
  type GeneratedBookSchema,
} from "@/lib/services/schemas/book.schema";
import { eq } from "drizzle-orm";

type PromptKey =
  | "generate_book"
  | "generate_character_from_image"
  | "generate_generic_image"
  | "generate_image_based_on_another";

async function resolvePromptTemplate(
  key: PromptKey,
  fallback: string,
): Promise<string> {
  const [prompt] = await db
    .select({
      promptText: promptTemplates.promptText,
    })
    .from(promptTemplates)
    .where(eq(promptTemplates.key, key))
    .limit(1);

  return prompt?.promptText?.trim() || fallback;
}

export async function generateBookFromStoryIdea(
  storyIdea: string,
): Promise<GeneratedBookSchema> {
  const defaultPrompt = buildGenerateBookPrompt(storyIdea);
  const template = await resolvePromptTemplate("generate_book", defaultPrompt);
  const prompt = `${template}\n\nStory idea: ${storyIdea}\nPage count must be exactly ${BOOK_PAGE_COUNT}.`;

  const response = await geminiClient.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: generatedBookSchema.toJSONSchema(),
    },
  });

  if (!response.text) {
    throw new Error("No generated book payload from Gemini");
  }

  return generatedBookSchema.parse(JSON.parse(response.text));
}

export async function generateCharacterFromImage(input: InlineImage): Promise<Buffer> {
  const fallback = buildGenerateCharacterPrompt();
  const prompt = await resolvePromptTemplate(
    "generate_character_from_image",
    fallback,
  );
  return generateImageWithGemini({ prompt, images: [input] });
}

export async function generateGenericImage({
  description,
  characterReference,
  extraPrompt,
}: {
  description: string;
  characterReference?: InlineImage;
  extraPrompt?: string;
}): Promise<Buffer> {
  const fallback = buildGenerateGenericImagePrompt({
    description,
    hasCharacterReference: Boolean(characterReference),
    extraPrompt,
  });
  const template = await resolvePromptTemplate("generate_generic_image", fallback);
  const prompt = `${template}\n\nDescription: ${description}\n${extraPrompt ? `Additional instructions: ${extraPrompt}` : ""}`;

  return generateImageWithGemini({
    prompt,
    images: characterReference ? [characterReference] : [],
  });
}

export async function generateImageBasedOnAnother({
  baseImage,
  baseCharacterImage,
  newCharacterImage,
}: {
  baseImage: InlineImage;
  baseCharacterImage: InlineImage;
  newCharacterImage: InlineImage;
}): Promise<Buffer> {
  const fallback = buildGenerateImageBasedOnAnotherPrompt();
  const prompt = await resolvePromptTemplate(
    "generate_image_based_on_another",
    fallback,
  );
  return generateImageWithGemini({
    prompt,
    images: [baseImage, baseCharacterImage, newCharacterImage],
  });
}
