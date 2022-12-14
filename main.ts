import {
  PDFDocument,
  rgb,
} from "https://cdn.skypack.dev/pdf-lib@%5E1.17.1?dts";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit@1.1.1?dts";

import { FourPages, renderFourPages } from "./lib.ts";

const pdfDoc = await PDFDocument.create();

pdfDoc.registerFontkit(fontkit);

const font = await pdfDoc.embedFont(
  await Deno.readFile("./ZenMaruGothic-Regular.ttf")
);

pdfDoc.setTitle("Generated Document");

const fourPages: FourPages = [
  {
    draw: (drawable) => {
      const fontSize = 20;
      const text = "手帳";
      drawable.drawText(text, {
        x: (drawable.width - font.widthOfTextAtSize(text, fontSize)) / 2,
        y: (drawable.height - fontSize) / 2,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    },
  },
  {
    draw: (drawable) => {
      const fontSize = 20;
      drawable.drawText("９月", {
        x: 20,
        y: 20,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      drawable.drawRectangle({
        x: 20,
        y: 60,
        width: drawable.width - 20,
        height: drawable.height - 80,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });
    },
  },
  {
    draw: (drawable) => {
      drawable.drawRectangle({
        x: 0,
        y: 60,
        width: drawable.width - 20,
        height: drawable.height - 80,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });
    },
  },
  {
    draw: (drawable) => {
      const fontSize = 20;
      drawable.drawText("4ページ目", {
        x: 20,
        y: 20,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    },
  },
];

renderFourPages(pdfDoc, fourPages, 20);

const pdfBytes = await pdfDoc.save();

await Deno.writeFile("out.pdf", pdfBytes);

/*
page1.drawText("4", {
  x: 12,
  y: 10,
  size: fontSize,
  font,
  color,
});
const titleFontSize = 20;
page1.drawText("２月 February", {
  x: 25,
  y: height - 25 - titleFontSize,
  font,
  size: titleFontSize,
  color,
});
const calendarHeight = height - 100;
page1.drawRectangle({
  x: 25,
  y: 25,
  width: width / 2 - 25,
  height: calendarHeight,
  borderWidth: 1,
  borderColor: rgb(0, 0, 0),
});
for (let i = 5; i >= 1; i--) {
  page1.drawLine({
    start: {
      x: 25,
      y: 25 + (calendarHeight / 6) * i,
    },
    end: {
      x: width / 2,
      y: 25 + (calendarHeight / 6) * i,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
}
for (let i = 1; i <= 3; i++) {
  page1.drawLine({
    start: {
      x: 25 + ((width / 2 - 25) / 4) * i,
      y: height - 75,
    },
    end: {
      x: 25 + ((width / 2 - 25) / 4) * i,
      y: 25,
    },
  });
}

const text1 = "1";
page1.drawText(text1, {
  x: width - 20 - font.widthOfTextAtSize(text1, fontSize),
  y: 20,
  font,
  size: fontSize,
  color,
});
page1.drawText("F# ではじめるプログラミング", {
  x: width / 2 + 40,
  y: height - 20 - fontSize,
  font,
  size: fontSize,
  color,
});

const page2 = pdfDoc.addPage(pageSize);
page2.drawText("2", {
  x: 20,
  y: 20,
  font,
  size: fontSize,
  color,
});
page2.drawText("開発環境の構築", {
  x: 20,
  y: height - 20 - fontSize,
  font,
  size: fontSize,
  color,
});

const text2 = "3";
page2.drawText("3", {
  x: width - 20 - font.widthOfTextAtSize(text2, fontSize),
  y: 20,
  font,
  size: fontSize,
  color,
});
page2.drawText("Hello, world!", {
  x: width / 2 + 40,
  y: height - 20 - fontSize,
  font,
  size: fontSize,
  color,
});
*/
