import PDFDocument from "pdfkit";

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
      const pointsPerInch = 72;
      const pageWidth = widthInches * pointsPerInch;
      const pageHeight = heightInches * pointsPerInch;
      const doc = new PDFDocument({
        size: [pageWidth, pageHeight],
        margin: 0,
        autoFirstPage: false,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      for (const imageBuffer of imageBuffers) {
        doc.addPage({ size: [pageWidth, pageHeight], margin: 0 });
        doc.image(imageBuffer, 0, 0, {
          fit: [pageWidth, pageHeight],
          align: "center",
          valign: "center",
        });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
