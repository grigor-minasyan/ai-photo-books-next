import { generateCharacterFromImage } from "../src/prompts";
import { imagePathToBase64 } from "../src/utils";
import sharp from "sharp";

const fileName = "elush.jpeg";

const { base64String, type } = await imagePathToBase64(
  `./characters/${fileName}`,
);

const pngBuffer = await generateCharacterFromImage({
  imageBase64: base64String,
  mediaType: type,
});

const jpgBuffer = await sharp(pngBuffer).jpeg({ quality: 90 }).toBuffer();

await Bun.write(
  `./characters/${fileName.split(".")[0]}-generated.jpg`,
  jpgBuffer,
);

process.exit(0);
