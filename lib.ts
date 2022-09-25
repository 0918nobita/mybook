import {
  Color,
  PageSizes,
  PDFDocument,
  PDFFont,
  PDFPage,
} from "https://cdn.skypack.dev/pdf-lib@%5E1.17.1?dts";

export type Drawable = {
  width: number;
  height: number;

  drawText: (
    text: string,
    options: {
      x: number;
      y: number;
      size: number;
      font?: PDFFont;
      color?: Color;
    }
  ) => void;

  drawLine: (options: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    thickness?: number;
    color?: Color;
  }) => void;

  drawRectangle: (options: {
    x: number;
    y: number;
    width: number;
    height: number;
    borderWidth?: number;
    borderColor?: Color;
  }) => void;
};

export type Page = {
  draw: (drawable: Drawable) => void;
};

export type FourPages = [Page, Page, Page, Page];

export const renderFourPages = (
  pdfDoc: PDFDocument,
  fourPages: FourPages,
  insideMargin: number
) => {
  const pageSize: [number, number] = [PageSizes.A4[1], PageSizes.A4[0]];

  const drawableForLeft = (pdfPage: PDFPage): Drawable => {
    const { width: frontPageWidth, height } = pdfPage.getSize();
    const width = frontPageWidth / 2 - insideMargin;

    return {
      width,
      height,
      drawText: (text, options) => {
        pdfPage.drawText(text, {
          ...options,
          y: height - options.y - options.size,
        });
      },
      drawLine: (options) => {
        pdfPage.drawLine({
          ...options,
          start: { x: options.start.x, y: height - options.start.y },
          end: { x: options.end.x, y: height - options.end.y },
        });
      },
      drawRectangle: (options) => {
        pdfPage.drawRectangle({
          ...options,
          y: height - options.y - options.height,
        });
      },
    };
  };

  const drawableForRight = (pdfPage: PDFPage): Drawable => {
    const { width: frontPageWidth, height } = pdfPage.getSize();
    const width = frontPageWidth / 2 - insideMargin;
    const offsetX = frontPageWidth / 2 + insideMargin;

    return {
      width,
      height,
      drawText: (text, options) => {
        pdfPage.drawText(text, {
          ...options,
          x: offsetX + options.x,
          y: height - options.y - options.size,
        });
      },
      drawLine: (options) => {
        pdfPage.drawLine({
          ...options,
          start: { x: offsetX + options.start.x, y: height - options.start.y },
          end: { x: offsetX + options.end.x, y: height - options.end.y },
        });
      },
      drawRectangle: (options) => {
        pdfPage.drawRectangle({
          ...options,
          x: offsetX + options.x,
          y: height - options.y - options.height,
        });
      },
    };
  };

  const pdfFrontPage = pdfDoc.addPage(pageSize);
  fourPages[3].draw(drawableForLeft(pdfFrontPage));
  fourPages[0].draw(drawableForRight(pdfFrontPage));

  const pdfBackPage = pdfDoc.addPage(pageSize);
  fourPages[1].draw(drawableForLeft(pdfBackPage));
  fourPages[2].draw(drawableForRight(pdfBackPage));
};
