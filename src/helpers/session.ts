import { DetaAdapter } from "../../deps.ts";
import env from "../env.ts";

export interface SessionVerse {
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  time: number;
}

export interface SessionData {
  settings: {
    defaultTranslation: string;
    markdownedVerse: boolean;
    versesPerPage: number;
  };
  lastRead: SessionVerse;
  bookmarks: {
    [key: string]: SessionVerse;
  };
}

export function initial(): SessionData {
  return {
    settings: {
      defaultTranslation: "kjv",
      markdownedVerse: false,
      versesPerPage: 10,
    },
    lastRead: {
      translation: "kjv",
      book: 43,
      chapter: 3,
      verse: 16,
      time: Date.now(),
    },
    bookmarks: {},
  };
}

export const storage = new DetaAdapter({
  baseName: "session",
  projectKey: env.DETA_KEY,
});
