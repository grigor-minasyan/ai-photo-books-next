import { generateGenericImage } from "./src/prompts";
import { generatedBooks } from "./src/constants";
import pLimit from "p-limit";

import assert from "node:assert";
import {
  addCurvedTitleForPage,
  addStylizedTextOverlayForPage,
  addTextBoxForBackCover,
} from "./src/imageEdit";
import { declineArmenianName } from "./src/utils";

const limit = pLimit(1);

// Promise.all(
//   generatedBooks[0].pages.map(async (curPage, i) => {
//     return limit(async () => {
//       if (i !== 2) return;
//       const CHARACTER_NAME = "Ալեք";
//       const characterImage = "./images/alec-character.png";
//       const OUTPUT_PATH = `./images/${prefix}-page-${i + 1}`;

//       const inputFile = Bun.file(characterImage);
//       assert(await inputFile.exists(), `File not found: ${characterImage}`);

//       const arrayBuffer = await inputFile.arrayBuffer();
//       const uint8Array = new Uint8Array(arrayBuffer);
//       const base64String = Buffer.from(uint8Array).toString("base64");

//       console.log(`Generating image for page ${i + 1}...`);
//       console.log(`Title: ${curPage.text}`);
//       console.log(`Description: ${curPage.imageDescription}`);

//       const image = await generateGenericImage({
//         description: curPage.imageDescription,
//         imageBase64: base64String,
//         mediaType: inputFile.type,
//       });

//       const textAddedImage = await addStylizedTextOverlayForPage(
//         image,
//         declineArmenianName(curPage.text, CHARACTER_NAME),
//         {
//           fontPath: "./fonts/NotoSansArmenian-VariableFont_wdth,wght.ttf",
//           fontFamily: "Noto Sans Armenian",
//         },
//       );

//       await Bun.write(`${OUTPUT_PATH}.png`, image);
//       await Bun.write(`${OUTPUT_PATH}_text.png`, textAddedImage);
//       console.log(`Saved generated page to ${OUTPUT_PATH}`);
//     });
//   }),
// );

// generate the book cover and ending page
const BOOK_INDEX = 0;
const book = generatedBooks[BOOK_INDEX];

const prefix = `book-${BOOK_INDEX}`;

const CHARACTER_NAME = "Ալեք";
const characterImagePath = "./test-images/alec-2.png";

const inputFile = Bun.file(characterImagePath);
const exists = await inputFile.exists();

if (!exists) {
  console.error(`File not found: ${characterImagePath}`);
  process.exit(1);
}

const characterImage = Buffer.from(
  new Uint8Array(await inputFile.arrayBuffer()),
).toString("base64");

console.log(`Generating cover image...`);
console.log(`Title: ${book.title}`);
console.log(`Description: ${book.coverImageDescription}`);

const image = await generateGenericImage({
  description: book.coverImageDescription,
  characterImageBase64: characterImage,
  mediaType: inputFile.type,
});

await Bun.write(`./test-images/${prefix}-cover-2.png`, image);
await Bun.write(
  `./test-images/${prefix}-cover_text-2.png`,
  await addCurvedTitleForPage(
    image,
    declineArmenianName(book.title, CHARACTER_NAME),
    {
      fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
      fontFamily: "Noto Serif Armenian",
      fontSize: 180,
    },
  ),
);

// generate back cover
const backCoverImage = await generateGenericImage({
  description: book.backCoverImageDescription,
  mediaType: inputFile.type,
});

await Bun.write(`./test-images/${prefix}-back-cover.png`, backCoverImage);
await Bun.write(
  `./test-images/${prefix}-back-cover_text.png`,
  await addTextBoxForBackCover(
    backCoverImage,
    declineArmenianName(book.endingText, CHARACTER_NAME),
    {
      fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
      fontFamily: "Noto Serif Armenian",
      fontSize: 180,
    },
  ),
);
