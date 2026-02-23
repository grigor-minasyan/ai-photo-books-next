import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  addCurvedTitleForPage,
  addStylizedTextOverlayForPage,
  addTextBoxForBackCover,
} from "../src/imageEdit";
import { declineArmenianName } from "../src/utils";
import type { Book } from "../src/schemas";

export interface TextOptions {
  fontPath: string;
  fontFamily: string;
  fontSize?: number;
}

export const DEFAULT_SERIF_FONT: TextOptions = {
  fontPath: "./fonts/NotoSerifArmenian-VariableFont_wdth,wght.ttf",
  fontFamily: "Noto Serif Armenian",
  fontSize: 180,
};

export const DEFAULT_SANS_FONT: TextOptions = {
  fontPath: "./fonts/NotoSansArmenian-VariableFont_wdth,wght.ttf",
  fontFamily: "Noto Sans Armenian",
};

export async function ensureDirectoryExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

export interface PagePaths {
  originalDir: string;
  withTextDir: string;
  originalPath: string;
  withTextPath: string;
  filename: string;
}

export function getPagePaths(
  bookIndex: number,
  characterId: string,
  pageType: "cover-front" | "cover-back" | "page",
  pageIndex?: number,
): PagePaths {
  const baseDir = `./books/${bookIndex}/${characterId}`;
  const originalDir = path.join(baseDir, "original");
  const withTextDir = path.join(baseDir, "with-text");

  let filename: string;
  if (pageType === "cover-front") {
    filename = "cover-front.jpg";
  } else if (pageType === "cover-back") {
    filename = "cover-back.jpg";
  } else {
    filename = `page-${pageIndex}.jpg`;
  }

  const originalPath = path.join(originalDir, filename);
  const withTextPath = path.join(withTextDir, filename);

  return {
    originalDir,
    withTextDir,
    originalPath,
    withTextPath,
    filename,
  };
}

export async function addTextToImage(
  imageBuffer: Buffer,
  pageType: "cover-front" | "cover-back" | "page",
  book: Book,
  characterName: string,
  pageIndex?: number,
): Promise<Buffer> {
  if (pageType === "cover-front") {
    return addCurvedTitleForPage(
      imageBuffer,
      declineArmenianName(book.title, characterName),
      DEFAULT_SERIF_FONT,
    );
  } else if (pageType === "cover-back") {
    return addTextBoxForBackCover(
      imageBuffer,
      declineArmenianName(book.endingText, characterName),
      DEFAULT_SERIF_FONT,
    );
  } else {
    const page = book.pages[pageIndex!];
    if (!page) {
      throw new Error(`Page ${pageIndex} not found in book`);
    }
    return addStylizedTextOverlayForPage(
      imageBuffer,
      declineArmenianName(page.text, characterName),
      DEFAULT_SANS_FONT,
    );
  }
}

export async function saveAsJpeg(
  buffer: Buffer,
  outputPath: string,
  quality: number = 90,
): Promise<void> {
  const jpg = await sharp(buffer).jpeg({ quality }).toBuffer();
  await Bun.write(outputPath, jpg);
}

export function checkFilesExist(
  bookIndex: number,
  characterId: string,
  pageCount: number,
): { allExist: boolean; missingFiles: string[] } {
  const missingFiles: string[] = [];

  // Check covers
  const coverFront = getPagePaths(bookIndex, characterId, "cover-front");
  const coverBack = getPagePaths(bookIndex, characterId, "cover-back");

  if (!existsSync(coverFront.originalPath)) {
    missingFiles.push(coverFront.originalPath);
  }
  if (!existsSync(coverBack.originalPath)) {
    missingFiles.push(coverBack.originalPath);
  }

  // Check pages
  for (let i = 0; i < pageCount; i++) {
    const pagePaths = getPagePaths(bookIndex, characterId, "page", i);
    if (!existsSync(pagePaths.originalPath)) {
      missingFiles.push(pagePaths.originalPath);
    }
  }

  return {
    allExist: missingFiles.length === 0,
    missingFiles,
  };
}
