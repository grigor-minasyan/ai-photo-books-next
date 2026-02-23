import PDFDocument from "pdfkit";

/**
 * Generates a single PDF from multiple image paths.
 *
 * @param imagePaths - Array of absolute paths to the images to include in the PDF.
 * @param widthInches - The width of each page in inches.
 * @param heightInches - The height of each page in inches.
 * @returns A Promise that resolves to a Buffer containing the PDF data.
 */
export async function generatePdfFromImages({
  imageBuffers,
  widthInches,
  heightInches,
}: {
  imageBuffers: Buffer[];
  widthInches: number;
  heightInches: number;
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // 1 inch = 72 points in PDFKit
      const POINTS_PER_INCH = 72;
      const pageWidth = widthInches * POINTS_PER_INCH;
      const pageHeight = heightInches * POINTS_PER_INCH;

      // Initialize the PDF document with the first page size
      const doc = new PDFDocument({
        size: [pageWidth, pageHeight],
        margin: 0,
        autoFirstPage: false, // We'll add pages manually to ensure consistent sizing
      });

      const chunks: Buffer[] = [];

      // Collect data chunks
      doc.on("data", (chunk) => chunks.push(chunk));

      // Resolve with the complete buffer when finished
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

      // Handle errors
      doc.on("error", reject);

      // Add each image as a new page
      for (const imageBuffer of imageBuffers) {
        doc.addPage({
          size: [pageWidth, pageHeight],
          margin: 0,
        });

        // Add the image, fitting it to the page size while maintaining aspect ratio
        // Centered both horizontally and vertically
        doc.image(imageBuffer, 0, 0, {
          fit: [pageWidth, pageHeight],
          align: "center",
          valign: "center",
        });
      }

      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
