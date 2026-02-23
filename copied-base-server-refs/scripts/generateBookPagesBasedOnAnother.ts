import { generatedBooks, CHARACTER_MAP } from "../src/constants";
import { generateImageBasedOnAnother } from "../src/prompts";
import { imagePathToBase64 } from "../src/utils";
import {
  ensureDirectoryExists,
  getPagePaths,
  addTextToImage,
  saveAsJpeg,
  checkFilesExist,
} from "./bookGenerationUtils";
import { existsSync } from "node:fs";

// Configuration - change these values to generate more pages
const BOOK_INDEX = 0;
const BASE_CHARACTER_ID = "alec"; // The character whose images we're using as base
const START_PAGE = 0;
const END_PAGE = 2; // inclusive, so covers + pages 0-2

interface GenerationTask {
  type: "cover-front" | "cover-back" | "page";
  pageIndex?: number;
  characterId: string;
  characterName: string;
  characterImagePath: string;
  bookIndex: number;
}

async function generateAndSavePageBasedOnAnother(task: GenerationTask) {
  const book = generatedBooks[task.bookIndex];
  if (!book) {
    throw new Error(`Book at index ${task.bookIndex} not found`);
  }

  const baseCharacter = CHARACTER_MAP[BASE_CHARACTER_ID];
  if (!baseCharacter) {
    throw new Error(`Base character ${BASE_CHARACTER_ID} not found`);
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
  if (existsSync(pagePaths.originalPath) && existsSync(pagePaths.withTextPath)) {
    console.log(
      `Skipping ${pagePaths.filename} for ${task.characterId} - already exists`,
    );
    return;
  }

  console.log(`Generating ${pagePaths.filename} for ${task.characterId}...`);

  // Get the base image path (from the base character)
  const basePagePaths = getPagePaths(
    task.bookIndex,
    BASE_CHARACTER_ID,
    task.type,
    task.pageIndex,
  );

  if (!existsSync(basePagePaths.originalPath)) {
    throw new Error(
      `Base image not found: ${basePagePaths.originalPath}. Cannot generate based on non-existent base.`,
    );
  }

  try {
    // Load base image
    const { base64String: baseImageBase64, type: baseImageType } =
      await imagePathToBase64(basePagePaths.originalPath);

    // Load base character image
    const { base64String: baseCharacterImage, type: baseCharacterType } =
      await imagePathToBase64(baseCharacter.imagePath);

    // Load new character image
    const { base64String: newCharacterImage, type: newCharacterType } =
      await imagePathToBase64(task.characterImagePath);

    console.log(`  Base image: ${basePagePaths.originalPath}`);
    console.log(`  Generating with new character...`);

    // Generate new image with character replacement
    const imageBuffer = await generateImageBasedOnAnother({
      baseImageBase64,
      baseCharacterImageBase64: baseCharacterImage,
      newCharacterImageBase64: newCharacterImage,
      mediaType: newCharacterType,
    });

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
    throw error;
  }
}

async function main() {
  const book = generatedBooks[BOOK_INDEX];
  if (!book) {
    throw new Error(`Book at index ${BOOK_INDEX} not found`);
  }

  console.log(
    `\nGenerating pages for book ${BOOK_INDEX}: "${book.title}" based on ${BASE_CHARACTER_ID}'s images\n`,
  );

  // First, verify that all base character images exist
  console.log(`Checking if base character (${BASE_CHARACTER_ID}) images exist...`);
  const baseCheck = checkFilesExist(BOOK_INDEX, BASE_CHARACTER_ID, END_PAGE + 1);

  if (!baseCheck.allExist) {
    console.error(
      `\n❌ ERROR: Base character images are missing!\n\nMissing files:`,
    );
    baseCheck.missingFiles.forEach((file) => console.error(`  - ${file}`));
    console.error(
      `\nPlease generate images for ${BASE_CHARACTER_ID} first using generateBookPages.ts\n`,
    );
    process.exit(1);
  }

  console.log(`✓ All base images exist\n`);

  // Create tasks for target characters (all except the base character)
  const tasks: GenerationTask[] = [];

  for (const [characterId, character] of Object.entries(CHARACTER_MAP)) {
    // Skip the base character
    if (characterId === BASE_CHARACTER_ID) {
      continue;
    }

    // Add front cover task
    tasks.push({
      type: "cover-front",
      characterId,
      characterName: character.name,
      characterImagePath: character.imagePath,
      bookIndex: BOOK_INDEX,
    });

    // Add back cover task
    tasks.push({
      type: "cover-back",
      characterId,
      characterName: character.name,
      characterImagePath: character.imagePath,
      bookIndex: BOOK_INDEX,
    });

    // Add page tasks
    for (let pageIndex = START_PAGE; pageIndex <= END_PAGE; pageIndex++) {
      if (pageIndex < book.pages.length) {
        tasks.push({
          type: "page",
          pageIndex,
          characterId,
          characterName: character.name,
          characterImagePath: character.imagePath,
          bookIndex: BOOK_INDEX,
        });
      }
    }
  }

  console.log(`Total tasks to process: ${tasks.length}\n`);

  // Process all tasks in parallel (bottleneck is already applied to API calls)
  await Promise.all(
    tasks.map((task) => generateAndSavePageBasedOnAnother(task)),
  );

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
