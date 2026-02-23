import { generatedBooks, CHARACTER_MAP } from "../src/constants";
import { generateGenericImage } from "../src/prompts";
import { imagePathToBase64 } from "../src/utils";
import {
  ensureDirectoryExists,
  getPagePaths,
  addTextToImage,
  saveAsJpeg,
} from "./bookGenerationUtils";
import { existsSync } from "node:fs";

// Configuration - change these values to generate more pages
const BOOK_INDEX = 1;
const CHARACTER = CHARACTER_MAP.alec;

const START_PAGE = 0;
const END_PAGE = 30; // inclusive

interface GenerationTask {
  type: "cover-front" | "cover-back" | "page";
  pageIndex?: number;
  characterId: string;
  characterName: string;
  characterImagePath: string;
  bookIndex: number;
}

async function generateAndSavePage(task: GenerationTask) {
  const book = generatedBooks[task.bookIndex];
  if (!book) {
    throw new Error(`Book at index ${task.bookIndex} not found`);
  }

  const pagePaths = getPagePaths(
    task.bookIndex,
    task.characterId,
    task.type,
    task.pageIndex,
  );

  // Ensure directories exist
  await ensureDirectoryExists(pagePaths.originalDir);
  await ensureDirectoryExists(pagePaths.withTextDir);

  // Skip if both files already exist
  if (
    existsSync(pagePaths.originalPath) &&
    existsSync(pagePaths.withTextPath)
  ) {
    console.log(
      `Skipping ${pagePaths.filename} for ${task.characterId} - already exists`,
    );
    return;
  }

  console.log(`Generating ${pagePaths.filename} for ${task.characterId}...`);

  // Get character image
  const { base64String: characterImage, type: mediaType } =
    await imagePathToBase64(task.characterImagePath);

  let imageBuffer: Buffer;

  try {
    if (task.type === "cover-front") {
      // Generate front cover
      console.log(`  Description: ${book.coverImageDescription}`);
      imageBuffer = await generateGenericImage({
        description: book.coverImageDescription,
        characterImageBase64: characterImage,
        mediaType,
      });
    } else if (task.type === "cover-back") {
      // Generate back cover
      console.log(`  Description: ${book.backCoverImageDescription}`);
      imageBuffer = await generateGenericImage({
        description: book.backCoverImageDescription,
        mediaType,
      });
    } else {
      // Generate regular page
      const page = book.pages[task.pageIndex!];
      if (!page) {
        throw new Error(
          `Page ${task.pageIndex} not found in book ${task.bookIndex}`,
        );
      }

      console.log(`  Text: ${page.text}`);
      console.log(`  Description: ${page.imageDescription}`);

      imageBuffer = await generateGenericImage({
        description: page.imageDescription,
        characterImageBase64: characterImage,
        mediaType,
      });
    }

    // Add text overlay
    const textAddedBuffer = await addTextToImage(
      imageBuffer,
      task.type,
      book,
      task.characterName,
      task.pageIndex,
    );

    // Save both versions
    await saveAsJpeg(imageBuffer, pagePaths.originalPath, 90);
    await saveAsJpeg(textAddedBuffer, pagePaths.withTextPath, 90);

    console.log(
      `  ✓ Saved to ${pagePaths.originalPath} and ${pagePaths.withTextPath}`,
    );
  } catch (error) {
    console.error(
      `Error generating ${pagePaths.filename} for ${task.characterId}:`,
      error,
    );
  }
}

async function main() {
  const book = generatedBooks[BOOK_INDEX];
  if (!book) {
    throw new Error(`Book at index ${BOOK_INDEX} not found`);
  }

  console.log(`\nGenerating pages for book ${BOOK_INDEX}: "${book.title}"\n`);

  // Create tasks for all characters and pages
  const tasks: GenerationTask[] = [];

  // Add front cover task
  tasks.push({
    type: "cover-front",
    characterId: CHARACTER.id,
    characterName: CHARACTER.name,
    characterImagePath: CHARACTER.imagePath,
    bookIndex: BOOK_INDEX,
  });

  // Add back cover task
  tasks.push({
    type: "cover-back",
    characterId: CHARACTER.id,
    characterName: CHARACTER.name,
    characterImagePath: CHARACTER.imagePath,
    bookIndex: BOOK_INDEX,
  });

  // Add page tasks
  for (let pageIndex = START_PAGE; pageIndex <= END_PAGE; pageIndex++) {
    if (pageIndex < book.pages.length) {
      tasks.push({
        type: "page",
        pageIndex,
        characterId: CHARACTER.id,
        characterName: CHARACTER.name,
        characterImagePath: CHARACTER.imagePath,
        bookIndex: BOOK_INDEX,
      });
    }
  }

  console.log(`Total tasks to process: ${tasks.length}\n`);

  // Process all tasks in parallel (bottleneck is already applied to API calls)
  await Promise.all(tasks.map((task) => generateAndSavePage(task)));

  console.log("\n✓ All pages generated successfully!");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
