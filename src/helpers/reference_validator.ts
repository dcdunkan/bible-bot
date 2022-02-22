import { books, booksAbbr, booksAbbr2, chapters } from "./constants.ts";

interface Reference {
  book: number;
  bookName?: string;
  chapter?: number;
  verse?: number;
  verseEnd?: number;
}

function findBookIndex(book: string): number | undefined {
  if (books.some((b) => b.toLowerCase() === book.toLowerCase())) {
    return books.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  } else if (booksAbbr.some((b) => b.toLowerCase() === book.toLowerCase())) {
    return booksAbbr.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  } else if (booksAbbr2.some((b) => b.toLowerCase() === book.toLowerCase())) {
    return booksAbbr2.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  } else return;
}
/**
 * A clone of the https://github.com/BibleJS/bible-reference-parser/blob/master/lib/index.js.
 * But specifically for this bot's purposes.
 */
export function validateRef(text: string): Reference | undefined {
  const book1 = findBookIndex(text);
  const book2 = findBookIndex(text.substring(0, text.lastIndexOf(" ")));

  if (!book1 && !book2) return;
  const bookNr = (book1 ?? book2!) + 1;

  const chapter = text.substring(text.lastIndexOf(" ") + 1).trim();
  const splits = chapter.split(":");

  const toReturn: Reference = {
    book: bookNr,
    bookName: books[bookNr - 1],
  };

  if (splits.length === 1) {
    // Just the chapter only.
    const chapter = parseInt(splits[0]);
    if (isNaN(chapter)) return toReturn;
    if (chapter < 1 || chapter > chapters[bookNr - 1]) return toReturn;
    toReturn.chapter = chapter;
  } else if (splits.length === 2) {
    // Chapter and verse.
    const chapter = parseInt(splits[0]);
    const verse = parseInt(splits[1]);

    if (isNaN(chapter)) return toReturn;
    if (chapter < 1 || chapter > chapters[bookNr - 1]) return toReturn;
    toReturn.chapter = chapter;

    if (isNaN(verse)) return toReturn;
    toReturn.verse = verse;

    const splits2 = splits[1].split("-");
    if (splits2.length === 2) {
      const verseEnd = parseInt(splits2[1]);
      if (isNaN(verseEnd)) return toReturn;
      toReturn.verseEnd = verseEnd;
    }
  }

  return toReturn;
}
