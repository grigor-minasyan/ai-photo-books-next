import { imageStyles } from "@/lib/services/image-generation/types";

export function buildGenerateBookPrompt(storyIdea: string): string {
  return `Generate a children's book where a user uploads a kid's photo and provides their name. The kid is the main character. The text must be Armenian, and every mention of the name must use {{NAME}}.
Return:
- title (Armenian)
- cover image description (English, detailed)
- exactly 30 pages where each page has text (Armenian) and imageDescription (English)
- endingText (Armenian)
- backCoverImageDescription (English, detailed; include guidance for displaying ending text)
Story idea: ${storyIdea}`;
}

export function buildGenerateCharacterPrompt(): string {
  return `Create a full-body standing character from the uploaded image. Keep facial features very similar, character should face the camera with a slight smile on a white background, in ${imageStyles.softDigital} style.`;
}

export function buildGenerateGenericImagePrompt({
  description,
  hasCharacterReference,
  extraPrompt,
}: {
  description: string;
  hasCharacterReference: boolean;
  extraPrompt?: string;
}): string {
  return `Generate a full-page image from the provided description in ${imageStyles.softDigital} style. No white borders. Description: ${description}. ${hasCharacterReference ? "Match the main character to the provided character reference image." : ""} ${extraPrompt ? `Additional instructions: ${extraPrompt}` : ""}`;
}

export function buildGenerateImageBasedOnAnotherPrompt(): string {
  return `You are given three images:
1) Base scene/page image
2) Base character image
3) New character image

Generate the same scene while replacing only the character with the new one.
Keep composition, background, style, lighting, and mood unchanged.
- Place the new character in the same location and pose.
- Do not alter non-character elements.
- Keep style as soft digital storybook illustration.
- No white borders around the image.`;
}
