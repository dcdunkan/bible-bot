import { Book, Chapter, Chapters, Translation, Verse } from "../types.ts";
import { getCache, isCached, useCache, writeCache } from "./cache.ts";

const API_ROOT = "https://getbible.net/v2";

async function getData<T>(
  src: string,
): Promise<T | undefined> {
  if (useCache && isCached(src)) {
    return getCache<T>(src);
  } else {
    const res = await fetch(`${API_ROOT}/${src}`);
    if (!res.ok) return;
    let data = await res.json();
    data = data.verses ? data : Object.values(data);
    if (useCache) writeCache(src, data);
    return data as T;
  }
}

export async function getTranslations(): Promise<Translation[] | undefined> {
  return await getData<Translation[]>("translations.json");
}

export async function getBooks(
  translation: string,
): Promise<Book[] | undefined> {
  return await getData<Book[]>(`${translation}/books.json`);
}

export async function getChapters(
  translation: string,
  bookId: number,
): Promise<Chapters[] | undefined> {
  return await getData<Chapters[]>(`${translation}/${bookId}/chapters.json`);
}

export async function getChapter(
  translation: string,
  bookId: number,
  chapter: number,
): Promise<Chapter | undefined> {
  return await getData<Chapter>(`${translation}/${bookId}/${chapter}.json`);
}

interface Portion {
  verses: Verse[];
  name: string;
  book_name: string;
  translation: string;
  language: string;
  total: number;
}

export async function getVerses(
  translation: string,
  bookId: number,
  chapter: number,
  verse?: number,
  verseEnd?: number,
): Promise<Portion | undefined> {
  const chapterData = await getChapter(translation, bookId, chapter);
  if (!chapterData) return;

  const verses = chapterData.verses;

  // If no verse is specified, return all verses.
  let toReturn: Verse[] = verses;

  // If a verse range is specified, return the verses in the range.
  if (verse && verseEnd) toReturn = verses.slice(verse, verseEnd);
  // If a single verse is specified, return the single verse.
  else if (verse) toReturn = [verses[verse - 1]];
  // If end of range of verses if specified, return the verses upto that.
  else if (!verse && verseEnd) toReturn = verses.slice(0, verseEnd);

  return {
    verses: toReturn,
    name: chapterData.name,
    book_name: chapterData.book_name,
    translation: chapterData.translation,
    language: chapterData.language,
    total: verses.length,
  };
}
