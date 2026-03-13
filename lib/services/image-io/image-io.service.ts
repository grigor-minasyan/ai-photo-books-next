import { readFile } from "node:fs/promises";
import path from "node:path";

import { toImageUrl } from "@/lib/utils/image-url";

function toAbsolutePath(inputPath: string): string {
  if (path.isAbsolute(inputPath)) {
    return inputPath;
  }
  return path.join(process.cwd(), inputPath.replace(/^\.\//, ""));
}

export async function readImageBufferFromPathOrUrl(
  input: string,
): Promise<Buffer> {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error(`Failed to fetch image URL: ${input}`);
    }
    const bytes = await response.arrayBuffer();
    return Buffer.from(bytes);
  }

  if (input.startsWith("./") || input.startsWith("/")) {
    const absolutePath = toAbsolutePath(input);
    return readFile(absolutePath);
  }

  // Storage key persisted in DB: build full URL dynamically.
  const resolvedUrl = toImageUrl(input, { fallbackPath: input });
  if (
    !resolvedUrl.startsWith("http://") &&
    !resolvedUrl.startsWith("https://")
  ) {
    throw new Error(
      "Cannot resolve storage image key to URL. Set NEXT_PUBLIC_IMAGE_BASE_URL to fetch stored assets.",
    );
  }
  const response = await fetch(resolvedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch storage image URL: ${resolvedUrl}`);
  }
  const bytes = await response.arrayBuffer();
  return Buffer.from(bytes);
}

export function toBase64Image(
  buffer: Buffer,
  mediaType = "image/jpeg",
): {
  imageBase64: string;
  mediaType: string;
} {
  return {
    imageBase64: buffer.toString("base64"),
    mediaType,
  };
}
