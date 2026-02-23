import { generatedBooks } from "../src/constants";
import {
  addStylizedTextOverlayForPage,
  addCurvedTitleForPage,
  addTextBoxForBackCover,
} from "../src/imageEdit";
import { declineArmenianName } from "../src/utils";

console.time("imageEditTest");

const buffer = await addStylizedTextOverlayForPage(
  await Bun.file("./images/HSCF3MQA4Z-cover.png").arrayBuffer(),
  declineArmenianName(generatedBooks[0].pages[0].text, "Ալեք"),
  {
    // fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
    // fontFamily: "Noto Serif Armenian",
    fontPath: "./fonts/NotoSansArmenian-VariableFont_wdth,wght.ttf",
    fontFamily: "Noto Sans Armenian",
  },
);

console.timeEnd("imageEditTest");

await Bun.write("./test.png", buffer);

// Test the new curved title function
console.time("curvedTitleTest");

const titleBuffer = await addCurvedTitleForPage(
  await Bun.file("./images/HSCF3MQA4Z-page-28.png").arrayBuffer(),
  declineArmenianName(generatedBooks[0].title, "Ալեք"),
  {
    fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
    fontFamily: "Noto Serif Armenian",
    fontSize: 180,
  },
);

console.timeEnd("curvedTitleTest");

await Bun.write("./test-title.png", titleBuffer);

// Test the back cover text box function
console.time("backCoverTest");

const backCoverBuffer = await addTextBoxForBackCover(
  await Bun.file("./images/HSCF3MQA4Z-page-28.png").arrayBuffer(),

  declineArmenianName(generatedBooks[0].endingText, "Ալեք"),
  {
    fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
    fontFamily: "Noto Serif Armenian",
    fontSize: 180,
  },
);

console.timeEnd("backCoverTest");

await Bun.write("./test-back-cover.png", backCoverBuffer);
