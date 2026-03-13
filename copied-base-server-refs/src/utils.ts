import assert from "assert";

export const imagePathToBase64 = async (
  imagePath: string,
): Promise<{
  base64String: string;
  type: string;
}> => {
  const inputFile = Bun.file(imagePath);
  const exists = await inputFile.exists();
  assert(exists, `File not found: ${imagePath}`);

  const arrayBuffer = await inputFile.arrayBuffer();

  const base64String = Buffer.from(new Uint8Array(arrayBuffer)).toString(
    "base64",
  );
  return { base64String, type: inputFile.type };
};
