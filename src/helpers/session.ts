import { DetaAdapter } from "../../deps.ts";
import env from "../env.ts";

interface Verse {
  version: string;
  book: string;
  chapter: number;
  verse: number;
}

export interface SessionData {
  settings: {
    defaultTranslation: string;
    markdownedVerse: boolean;
    versePerPage: number;
  };
  lastRead: Verse;
  bookmarks: Verse[];
}

export function initial(): SessionData {
  return {
    settings: {
      defaultTranslation: "kjv",
      markdownedVerse: true,
      versePerPage: 10,
    },
    lastRead: {
      version: "kjv",
      book: "John",
      chapter: 3,
      verse: 16,
    },
    bookmarks: [],
  };
}

export const storage = new DetaAdapter({
  baseName: "session",
  projectKey: env.DETA_KEY,
});
