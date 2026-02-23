import {
  ApiError,
  GenerateContentResponse,
  GoogleGenAI,
  type GenerateContentParameters,
} from "@google/genai";
import { env } from "./schemas";

export const googleAiClient = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const generateImage = async (
  prompt: string,
  images: { imageBase64: string; mediaType: string }[],
): Promise<Buffer> => {
  let response: GenerateContentResponse | null = null;
  const payload: GenerateContentParameters = {
    model: "gemini-3-pro-image-preview",
    config: { imageConfig: { aspectRatio: "1:1", imageSize: "2K" } },
    contents: [
      { text: prompt },
      ...images.map((image) => ({
        inlineData: {
          mimeType: image.mediaType,
          data: image.imageBase64,
        },
      })),
    ],
  };
  try {
    response = await googleAiClient.models.generateContent(payload);
  } catch (e) {
    // TODO add logging
    if (e instanceof ApiError && e.status >= 500 && e.status < 600) {
      // retry
      try {
        response = await googleAiClient.models.generateContent(payload);
      } catch (e) {
        throw e;
      }
    } else {
      throw e;
    }
  }

  if (!response.candidates?.[0]?.content?.parts) {
    throw new Error("No images generated");
  }
  const firstImage = response.candidates[0].content.parts
    .filter((part) => part.inlineData?.data)
    .map((part) => part.inlineData?.data)[0];

  if (!firstImage) {
    throw new Error("No images generated");
  }
  const buffer = Buffer.from(firstImage, "base64");
  return buffer;
};
