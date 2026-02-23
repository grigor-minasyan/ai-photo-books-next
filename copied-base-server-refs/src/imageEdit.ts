import { Canvas, FontLibrary } from "skia-canvas";
import sharp from "sharp";

interface TextOptions {
  fontPath: string;
  fontFamily: string;
  fontSize?: number;
  padding?: number;
}

/**
 * Adds stylized Armenian/Universal text to the bottom 15% of an image
 * with a glassmorphism blur effect and stroke.
 */
export async function addStylizedTextOverlayForPage(
  imageBuffer: Buffer | ArrayBuffer,
  text: string,
  options: TextOptions,
): Promise<Buffer> {
  // 1. Register the custom font
  // eslint-disable-next-line react-hooks/rules-of-hooks
  FontLibrary.use(options.fontFamily, options.fontPath);

  // 2. Get image dimensions
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  if (!width || !height) throw new Error("Invalid image dimensions");

  // 3. Define the bottom 15% area
  const overlayHeight = Math.floor(height * 0.15);
  const overlayTop = height - overlayHeight;
  const padding = options.padding || Math.floor(width * 0.05); // 5% edge padding

  // 4. Create the "Glassmorphism" Blur Strip
  // We extract the bottom, blur it, and darken it slightly
  const blurredStrip = await image
    .clone()
    .extract({ left: 0, top: overlayTop, width, height: overlayHeight })
    .blur(5)
    .toBuffer();

  // Create a gradient mask for fade effect
  const fadeHeight = Math.floor(overlayHeight * 0.3); // Fade over top 30% of the strip

  // Get raw pixel data from blurred strip
  const { data } = await sharp(blurredStrip)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Apply gradient to alpha channel
  for (let y = 0; y < overlayHeight; y++) {
    const alpha = y < fadeHeight ? Math.floor((y / fadeHeight) * 255) : 255;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      data[idx + 3] = alpha; // Set alpha channel
    }
  }

  // Convert back to buffer
  const blurredStripWithFade = await sharp(data, {
    raw: { width, height: overlayHeight, channels: 4 },
  })
    .png()
    .toBuffer();

  // 5. Create the Text Overlay using Canvas
  const canvas = new Canvas(width, overlayHeight);
  const ctx = canvas.getContext("2d");

  // Configure Text Styles
  // Configure Text Styles
  let fontSize = options.fontSize || Math.floor(overlayHeight * 0.3);
  const minFontSize = 10;
  const maxWidth = width - padding * 2;
  let lines: string[] = [];

  // Auto-scale font size
  while (fontSize >= minFontSize) {
    ctx.font = `${fontSize}px "${options.fontFamily}"`;
    lines = getWrappedLines(ctx, text, maxWidth);

    const totalHeight = lines.length * (fontSize * 1.2);
    // Ensure text fits within 90% of overlay height
    if (totalHeight <= overlayHeight * 0.9) {
      break;
    }
    fontSize -= 2;
  }

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 9;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.2;
  let currentY = overlayHeight / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line) => {
    // Draw stroke first
    ctx.strokeText(line, width / 2, currentY);
    // Then draw fill
    ctx.fillText(line, width / 2, currentY);
    currentY += lineHeight;
  });

  const textBuffer = await canvas.toBuffer("png");

  // 6. Composite everything back together
  return image
    .composite([
      { input: blurredStripWithFade, top: overlayTop, left: 0 },
      { input: textBuffer, top: overlayTop, left: 0 },
    ])
    .toBuffer();
}

/**
 * Calculate complementary color based on background for good contrast
 */
async function calculateComplementaryColor(
  image: sharp.Sharp,
  extractOptions: { left: number; top: number; width: number; height: number },
): Promise<{ textColor: string; strokeColor: string; borderColor: string }> {
  // Extract portion to analyze background color
  const portion = await image
    .clone()
    .extract(extractOptions)
    .resize(100, 50, { fit: "cover" }) // Resize for faster processing
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Calculate average background color
  let rSum = 0,
    gSum = 0,
    bSum = 0;
  const pixelCount = portion.info.width * portion.info.height;
  const data = portion.data;

  for (let i = 0; i < data.length; i += 4) {
    rSum += data[i] || 0;
    gSum += data[i + 1] || 0;
    bSum += data[i + 2] || 0;
  }

  const avgR = Math.floor(rSum / pixelCount);
  const avgG = Math.floor(gSum / pixelCount);
  const avgB = Math.floor(bSum / pixelCount);

  // Calculate complementary color (opposite on color wheel)
  const complementaryR = 255 - avgR;
  const complementaryG = 255 - avgG;
  const complementaryB = 255 - avgB;

  // Ensure good contrast by checking luminance
  const bgLuminance = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;

  let strokeColor: string;
  let finalR: number, finalG: number, finalB: number;

  if (bgLuminance < 128) {
    // Dark background - use bright, playful colors
    finalR = Math.min(255, complementaryR + 50);
    finalG = Math.min(255, complementaryG + 50);
    finalB = Math.min(255, complementaryB + 50);
    strokeColor = "rgba(0, 0, 0, 0.8)"; // Dark stroke for contrast
  } else {
    // Light background - use darker, vibrant colors
    finalR = Math.max(0, complementaryR - 30);
    finalG = Math.max(0, complementaryG - 30);
    finalB = Math.max(0, complementaryB - 30);
    strokeColor = "rgba(255, 255, 255, 0.8)"; // Light stroke for contrast
  }

  // Calculate final text luminance and ensure sufficient contrast
  const textLuminance = 0.299 * finalR + 0.587 * finalG + 0.114 * finalB;
  const contrastRatio = Math.abs(textLuminance - bgLuminance) / 255;

  // If contrast is too low (less than 0.5), adjust colors to improve it
  if (contrastRatio < 0.5) {
    if (bgLuminance < 128) {
      // Make text even brighter
      finalR = Math.min(255, finalR + 30);
      finalG = Math.min(255, finalG + 30);
      finalB = Math.min(255, finalB + 30);
    } else {
      // Make text even darker
      finalR = Math.max(0, finalR - 30);
      finalG = Math.max(0, finalG - 30);
      finalB = Math.max(0, finalB - 30);
    }
  }

  const textColor = `rgb(${finalR}, ${finalG}, ${finalB})`;
  const borderColor = `rgb(${finalR}, ${finalG}, ${finalB})`;

  return { textColor, strokeColor, borderColor };
}

/**
 * Adds a curved, playful title to the top 40% of an image for children's books.
 * The text follows a curved path and uses a complementary color for visibility.
 */
export async function addCurvedTitleForPage(
  imageBuffer: Buffer | ArrayBuffer,
  text: string,
  options: TextOptions,
): Promise<Buffer> {
  // 1. Register the custom font
  // eslint-disable-next-line react-hooks/rules-of-hooks
  FontLibrary.use(options.fontFamily, options.fontPath);

  // 2. Get image dimensions
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  if (!width || !height) throw new Error("Invalid image dimensions");

  // 3. Define the top 40% area
  const overlayHeight = Math.floor(height * 0.4);

  // 4. Calculate complementary colors
  const { textColor, strokeColor } = await calculateComplementaryColor(image, {
    left: 0,
    top: 0,
    width,
    height: overlayHeight,
  });

  // 5. Create canvas for curved text
  const canvas = new Canvas(width, overlayHeight);
  const ctx = canvas.getContext("2d");

  // Split text into 2 lines at the nearest word boundary to the middle
  const lines = splitTextIntoTwoLines(text);

  // 10% padding on each side
  const sidePadding = width * 0.1;
  const maxLineWidth = width - sidePadding * 2;

  // Find the maximum font size that fits both lines
  // Start with a large font and decrease until it fits
  const maxFontSize = options.fontSize || Math.floor(overlayHeight * 0.25);
  const minFontSize = 20;
  const CHAR_SPACING_FACTOR = 0.05;
  let fontSize = maxFontSize;

  // Loop to find optimal font size
  while (fontSize >= minFontSize) {
    ctx.font = `bold ${fontSize}px "${options.fontFamily}"`;
    const charSpacing = fontSize * CHAR_SPACING_FACTOR;

    // Check if both lines fit
    let fitsAll = true;
    for (const line of lines) {
      const lineWidth = measureLineWidth(ctx, line, charSpacing);
      if (lineWidth > maxLineWidth) {
        fitsAll = false;
        break;
      }
    }

    if (fitsAll) break;
    fontSize -= 2;
  }

  // Final font setup
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Playful styling - thicker stroke, rounded edges
  ctx.lineWidth = Math.max(4, fontSize * 0.12);
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;

  const charSpacing = fontSize * CHAR_SPACING_FACTOR;
  const lineSpacing = fontSize * 1.4; // Space between lines

  // Use a large radius for a gentle curve
  const radius = width * 2.5;
  const centerX = width / 2;
  const centerAngle = Math.PI * 1.5; // 270 degrees - bottom of circle

  // Draw each line with a curve
  lines.forEach((line, lineIndex) => {
    // Calculate Y position for this line
    const baseY = overlayHeight * 0.2 + lineIndex * lineSpacing;
    const centerY = baseY + radius;

    // Calculate character widths for this line
    const characters = line.split("");
    const charWidths: number[] = [];
    let totalLineWidth = 0;

    characters.forEach((char) => {
      const charWidth = ctx.measureText(char).width;
      charWidths.push(charWidth);
      totalLineWidth += charWidth;
    });
    totalLineWidth += charSpacing * (characters.length - 1);

    // Calculate arc angle for this line
    const totalArcAngle = totalLineWidth / radius;
    const startAngle = centerAngle - totalArcAngle / 2;
    const endAngle = centerAngle + totalArcAngle / 2;

    // Position each character along the arc
    let cumulativeWidth = 0;

    characters.forEach((char, charIndex) => {
      const charWidth = charWidths[charIndex] || 0;

      // Position at the center of the character
      cumulativeWidth += charWidth / 2;

      // Calculate angle based on cumulative position
      const t = cumulativeWidth / totalLineWidth;
      const angle = startAngle + (endAngle - startAngle) * t;

      // Position on the circle
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Draw the character
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);

      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = textColor;
      ctx.strokeText(char, 0, 0);
      ctx.fillText(char, 0, 0);

      ctx.restore();

      // Move to the end of this character and add spacing
      cumulativeWidth += charWidth / 2;
      if (charIndex < characters.length - 1) {
        cumulativeWidth += charSpacing;
      }
    });
  });

  const textBuffer = await canvas.toBuffer("png");

  // 7. Composite text onto the original image
  return image.composite([{ input: textBuffer, top: 0, left: 0 }]).toBuffer();
}

/**
 * Split text into exactly 2 lines at the nearest word boundary to the middle
 */
function splitTextIntoTwoLines(text: string): string[] {
  const words = text.split(" ");

  // If only one word, return it as a single line
  if (words.length <= 1) {
    return [text];
  }

  // Find the middle character position
  const midPoint = text.length / 2;

  // Find the word boundary closest to the middle
  let currentPos = 0;
  let bestSplitIndex = 0;
  let bestDistance = Infinity;

  for (let i = 0; i < words.length - 1; i++) {
    currentPos += (words[i]?.length || 0) + 1; // +1 for space
    const distance = Math.abs(currentPos - midPoint);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestSplitIndex = i + 1;
    }
  }

  // Split at the best position
  const line1 = words.slice(0, bestSplitIndex).join(" ");
  const line2 = words.slice(bestSplitIndex).join(" ");

  return [line1, line2];
}

/**
 * Measure the total width of a line including character spacing
 */
function measureLineWidth(
  ctx: ReturnType<typeof Canvas.prototype.getContext>,
  line: string,
  charSpacing: number,
): number {
  const characters = line.split("");
  let totalWidth = 0;

  characters.forEach((char) => {
    totalWidth += ctx.measureText(char).width;
  });
  totalWidth += charSpacing * (characters.length - 1);

  return totalWidth;
}

/**
 * Adds text to the back cover with a blurred box and complementary border.
 * The box starts at 10% from the top and extends to 45% of the page height.
 */
export async function addTextBoxForBackCover(
  imageBuffer: Buffer | ArrayBuffer,
  text: string,
  options: TextOptions,
): Promise<Buffer> {
  // 1. Register the custom font
  // eslint-disable-next-line react-hooks/rules-of-hooks
  FontLibrary.use(options.fontFamily, options.fontPath);

  // 2. Get image dimensions
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  if (!width || !height) throw new Error("Invalid image dimensions");

  // 3. Define the box area (15% from top to 50% from top = 35% height)
  const boxTop = Math.floor(height * 0.1);
  const boxHeight = Math.floor(height * 0.3); // 50% - 15% = 35%
  const sidePadding = Math.floor(width * 0.1); // 10% padding on each side
  const boxWidth = width - sidePadding * 2;

  // 4. Calculate complementary colors based on the box area
  const { textColor, strokeColor, borderColor } =
    await calculateComplementaryColor(image, {
      left: sidePadding,
      top: boxTop,
      width: boxWidth,
      height: boxHeight,
    });

  // 5. Create the blurred background for the box
  const blurredBox = await image
    .clone()
    .extract({
      left: sidePadding,
      top: boxTop,
      width: boxWidth,
      height: boxHeight,
    })
    .blur(30)
    .toBuffer();

  // Add semi-transparent overlay for better text visibility and draw border
  const overlayCanvas = new Canvas(boxWidth, boxHeight);
  const overlayCtx = overlayCanvas.getContext("2d");

  // Add semi-transparent overlay
  overlayCtx.fillStyle = "rgba(255, 255, 255, 0.3)";
  overlayCtx.fillRect(0, 0, boxWidth, boxHeight);

  // Draw border with complementary color
  overlayCtx.strokeStyle = borderColor;
  overlayCtx.lineWidth = Math.max(4, Math.floor(boxWidth * 0.008));
  overlayCtx.strokeRect(
    overlayCtx.lineWidth / 2,
    overlayCtx.lineWidth / 2,
    boxWidth - overlayCtx.lineWidth,
    boxHeight - overlayCtx.lineWidth,
  );

  const overlayBuffer = await overlayCanvas.toBuffer("png");

  // 7. Create text overlay with 15% padding inside the box
  const innerPadding = Math.floor(boxWidth * 0.05); // Slightly reduced padding for more text space
  const textCanvas = new Canvas(boxWidth, boxHeight);
  const textCtx = textCanvas.getContext("2d");

  // Configure text styles and find optimal font size
  // Start with a large font size and decrease until it fits
  let fontSize =
    options.fontSize || Math.floor(Math.min(boxHeight, boxWidth) * 0.5); // More aggressive starting size
  const minFontSize = 10;
  const LINE_HEIGHT_FACTOR = 1.3;
  const maxTextWidth = boxWidth - innerPadding * 2;
  const maxTextHeight = boxHeight - innerPadding * 2;
  let lines: string[] = [];

  // Auto-scale font size to fit text in the box - find maximum size that fits
  while (fontSize >= minFontSize) {
    textCtx.font = `bold ${fontSize}px "${options.fontFamily}"`;
    lines = getWrappedLines(textCtx, text, maxTextWidth);

    const lineHeight = fontSize * LINE_HEIGHT_FACTOR; // Tighter line height for better space usage
    const totalHeight = lines.length * lineHeight;

    // Ensure text fits within the inner area
    if (totalHeight <= maxTextHeight) {
      break;
    }
    fontSize -= 2;
  }

  textCtx.fillStyle = textColor;
  textCtx.strokeStyle = strokeColor;
  textCtx.lineWidth = Math.max(6, fontSize * 0.05);
  textCtx.lineJoin = "round";
  textCtx.miterLimit = 2;
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";

  // Draw text lines
  const lineHeight = fontSize * LINE_HEIGHT_FACTOR; // Match the line height used in calculation
  const totalTextHeight = lines.length * lineHeight;
  const startY = (boxHeight - totalTextHeight) / 2 + lineHeight / 2;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    // Draw stroke first for better visibility
    textCtx.strokeText(line, boxWidth / 2, y);
    // Then draw fill
    textCtx.fillText(line, boxWidth / 2, y);
  });

  const textBuffer = await textCanvas.toBuffer("png");

  // 8. Composite everything back together
  return image
    .composite([
      { input: blurredBox, top: boxTop, left: sidePadding },
      { input: overlayBuffer, top: boxTop, left: sidePadding },
      { input: textBuffer, top: boxTop, left: sidePadding },
    ])
    .toBuffer();
}

/**
 * Canvas text wrapping logic
 */
// Helper function to calculate wrapped lines
function getWrappedLines(
  ctx: ReturnType<typeof Canvas.prototype.getContext>,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0] as string;

  for (let i = 1; i < words.length; i++) {
    const word = words[i] as string;
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
