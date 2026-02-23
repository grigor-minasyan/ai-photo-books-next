import { BOOK_PAGE_COUNT, bookSchema, type Book } from "./schemas";
import { ImageStyles } from "./constants";

import { generateImage, googleAiClient } from "./geminiClient";

export const generateBook = async (storyIdea: string): Promise<Book> => {
  const prompt = `Generate a book for children. The main theme for the book is that the users will
    upload a picture of their kid, and provide the name of the kid. The kid is the main character of the book.
    The book is going to be a photo book, so on each page there will be a photo and a 2-3 lines of text.
    The text should be in armenian. And wherever the kid's name is mentioned, it should be mentioned as {{NAME}}.
    This is the story idea: ${storyIdea}.
    Also generate the image descriptions for each page, the descriptions should be in english, and should be detailed
    and provide the scene of the image, they should be descriptive enough to be used for ai models to create images
    of the scene. They can include the characters photo in there as well, and match the story of that page.
     The book should be ${BOOK_PAGE_COUNT} pages long. It should also include a title and an ending closing text as well to be used on the back cover. The title should be in armenian, and the ending text should be in armenian as well.
     Also generate the image descriptions for the cover and back cover, the descriptions should be in english, and should be details
     and provide the scene of the image, they should be descriptive enough to be used for ai models to create images
     of the scene. For the cover image description, include the title and the name of the main character with {{NAME}}. The back cover image generation description should include the title and the ending text and provide details on how the ending text needs to be displayed on the back cover.`;

  const response = await googleAiClient.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: bookSchema.toJSONSchema(),
    },
  });

  console.log(response);
  const output = response.text;

  if (!output) {
    throw new Error("No output");
  }

  const parsed = bookSchema.parse(JSON.parse(output));

  return parsed;
};

export const generateCharacterFromImage = async ({
  imageBase64,
  mediaType,
}: {
  imageBase64: string;
  mediaType: string;
}): Promise<Buffer> => {
  const prompt = `A character from the uploaded image. Very important that the facial features are very similar to the uploaded image. The character should be standing upright and be visible from head to toe, and should be looking at the camera directly, and should have slight smile. The character should be on white background. The style should be ${ImageStyles.softDigital}.`;
  return generateImage(prompt, [{ imageBase64, mediaType }]);
};

export const generateGenericImage = async ({
  description,
  characterImageBase64,
  mediaType,
  extraPrompt,
}: {
  description: string;
  characterImageBase64?: string;
  mediaType: string;
  extraPrompt?: string;
}): Promise<Buffer> => {
  const prompt = `Generate an image based on the following description: ${description}. The image should cover the whole page, so no white space should be visible around the image.${characterImageBase64 ? " The main character of the image should be based on the uploaded image." : ""} 
  The style should be: ${ImageStyles.softDigital}.
  ${extraPrompt ? `Additional instructions: ${extraPrompt}` : ""}`;

  return generateImage(
    prompt,
    characterImageBase64
      ? [{ imageBase64: characterImageBase64, mediaType }]
      : [],
  );
};

export const generateImageBasedOnAnother = async ({
  baseImageBase64,
  baseCharacterImageBase64,
  newCharacterImageBase64,
  mediaType,
}: {
  baseImageBase64: string;
  baseCharacterImageBase64: string;
  newCharacterImageBase64: string;
  mediaType: string;
}): Promise<Buffer> => {
  const prompt = `You are given three images:
1. A base scene/page from a children's book
2. The base character that may or may not appear in the scene
3. A new character

Your task: Generate the exact same scene as the base image, but replace the base character with the new character. Keep everything else identical - the background, the setting, the composition, the style, the lighting, and the mood should all remain the same. Only the character should change. Do not make any changes if the original image does not have a character.

Important instructions:
- The new character should be positioned exactly where the base character was
- The new character should be doing the same action/pose as the base character
- The style should remain: ${ImageStyles.softDigital}
- The image should cover the whole page with no white space visible around it
- Maintain the same perspective, framing, and overall composition`;

  return generateImage(prompt, [
    { imageBase64: baseImageBase64, mediaType },
    { imageBase64: baseCharacterImageBase64, mediaType },
    { imageBase64: newCharacterImageBase64, mediaType },
  ]);
};
