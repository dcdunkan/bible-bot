import { InlineKeyboard } from "../../deps.ts";
import { getChapters, getTranslations } from "./api.ts";

export async function getTranslationsKeyboard(
  page: number,
) {
  const trs = await getTranslations();
  if (!trs) return;

  const PER_PAGE = 16;
  const IN_ONE_ROW = 2;
  const lastPage = Math.ceil(trs.length / PER_PAGE);
  const start = PER_PAGE * (page - 1);
  const end = (PER_PAGE * page);

  const translations = trs.slice(start, end);

  const keyboard = new InlineKeyboard();
  for (let i = 0; i < translations.length; i++) {
    if (!translations[i]) break;
    const { abbreviation: abbr, language } = translations[i];
    if (i !== 0 && i % IN_ONE_ROW === 0) keyboard.row();
    keyboard.text(`${abbr.toUpperCase()}: ${language}`, `read:${abbr}`);
  }

  if (page === lastPage) {
    keyboard.row().text("￩ Previous", `tr:${page - 1}`);
  } else if (page === 1) {
    keyboard.row().text("Next ￫", `tr:${page + 1}`);
  } else {
    keyboard.row()
      .text("￩ Previous", `tr:${page - 1}`)
      .text("Next ￫", `tr:${page + 1}`);
  }

  return {
    keyboard,
    lastPage,
    total: trs.length,
    onPage: translations.length,
  };
}

export async function getChaptersKeyboard(
  translation: string,
  book: number,
  page: number,
) {
  const chaps = await getChapters(translation, book);
  if (!chaps) return;

  const PER_PAGE = 48;
  const IN_ONE_ROW = 4;

  const lastPage = Math.ceil(chaps.length / PER_PAGE);
  const start = PER_PAGE * (page - 1);
  const end = (PER_PAGE * page);

  const chapters = chaps.slice(start, end);

  const { translation: tr, book_name, language } = chapters[0];

  const keyboard = new InlineKeyboard();
  for (let i = 0; i < chapters.length; i++) {
    if (!chapters[i]) break;
    const { abbreviation: abbr, chapter } = chapters[i];
    if (i !== 0 && i % IN_ONE_ROW === 0) keyboard.row();
    keyboard.text(`${chapter}`, `read:${abbr}:${book}:${chapter}-1`);
  }

  if (lastPage !== 1) {
    if (page === lastPage) {
      keyboard.row().text(
        "￩ Previous",
        `read:${translation}:${book}-${page - 1}`,
      );
    } else if (page === 1) {
      keyboard.row().text("Next ￫", `read:${translation}:${book}-${page + 1}`);
    } else {
      keyboard.row()
        .text("￩ Previous", `read:${translation}:${book}-${page - 1}`)
        .text("Next ￫", `read:${translation}:${book}-${page + 1}`);
    }
  }

  keyboard.row()
    .text("🗣 Translations", `tr:1`)
    .text("📚 Books", `read:${translation}:${book < 40 ? "old" : "new"}`);

  return {
    keyboard,
    lastPage,
    total: chaps.length,
    onPage: chapters.length,
    tr,
    book_name,
    language,
  };
}

export const keyboards = {
  oldTstmnt: (tr: string) => {
    return {
      inline_keyboard: [
        [
          { text: "Genesis", callback_data: `read:${tr}:1-1` },
          { text: "Exodus", callback_data: `read:${tr}:2-1` },
        ],
        [
          { text: "Leviticus", callback_data: `read:${tr}:3-1` },
          { text: "Numbers", callback_data: `read:${tr}:4-1` },
        ],
        [
          { text: "Deuteronomy", callback_data: `read:${tr}:5-1` },
          { text: "Joshua", callback_data: `read:${tr}:6-1` },
        ],
        [
          { text: "Judges", callback_data: `read:${tr}:7-1` },
          { text: "Ruth", callback_data: `read:${tr}:8-1` },
        ],
        [
          { text: "1 Samuel", callback_data: `read:${tr}:9-1` },
          { text: "2 Samuel", callback_data: `read:${tr}:10-1` },
        ],
        [
          { text: "1 Kings", callback_data: `read:${tr}:11-1` },
          { text: "2 Kings", callback_data: `read:${tr}:12-1` },
        ],
        [
          { text: "1 Chronicles", callback_data: `read:${tr}:13-1` },
          { text: "2 Chronicles", callback_data: `read:${tr}:14-1` },
        ],
        [
          { text: "Ezra", callback_data: `read:${tr}:15-1` },
          { text: "Nehemiah", callback_data: `read:${tr}:16-1` },
        ],
        [
          { text: "Esther", callback_data: `read:${tr}:17-1` },
          { text: "Job", callback_data: `read:${tr}:18-1` },
        ],
        [
          { text: "Psalms", callback_data: `read:${tr}:19-1` },
          { text: "Proverbs", callback_data: `read:${tr}:20-1` },
        ],
        [
          { text: "Ecclesiastes", callback_data: `read:${tr}:21-1` },
          { text: "Song of Songs", callback_data: `read:${tr}:22-1` },
        ],
        [
          { text: "Isaiah", callback_data: `read:${tr}:23-1` },
          { text: "Jeremiah", callback_data: `read:${tr}:24-1` },
        ],
        [
          { text: "Lamentations", callback_data: `read:${tr}:25-1` },
          { text: "Ezekiel", callback_data: `read:${tr}:26-1` },
        ],
        [
          { text: "Daniel", callback_data: `read:${tr}:27-1` },
          { text: "Hosea", callback_data: `read:${tr}:28-1` },
        ],
        [
          { text: "Joel", callback_data: `read:${tr}:29-1` },
          { text: "Amos", callback_data: `read:${tr}:30-1` },
        ],
        [
          { text: "Obadiah", callback_data: `read:${tr}:31-1` },
          { text: "Jonah", callback_data: `read:${tr}:32-1` },
        ],
        [
          { text: "Micah", callback_data: `read:${tr}:33-1` },
          { text: "Nahum", callback_data: `read:${tr}:34-1` },
        ],
        [
          { text: "Habakkuk", callback_data: `read:${tr}:35-1` },
          { text: "Zephaniah", callback_data: `read:${tr}:36-1` },
        ],
        [
          { text: "Haggai", callback_data: `read:${tr}:37-1` },
          { text: "Zechariah", callback_data: `read:${tr}:38-1` },
        ],
        [
          { text: "Malachi", callback_data: `read:${tr}:39-1` },
        ],
        [{ text: "🔁 New Testament", callback_data: `read:${tr}:new` }],
        [{ text: "⟵ Testaments", callback_data: `read:${tr}` }],
      ],
    };
  },
  newTstmnt: (tr: string) => {
    return {
      inline_keyboard: [
        [
          { text: "Matthew", callback_data: `read:${tr}:40-1` },
          { text: "Mark", callback_data: `read:${tr}:41-1` },
        ],
        [
          { text: "Luke", callback_data: `read:${tr}:42-1` },
          { text: "John", callback_data: `read:${tr}:43-1` },
        ],
        [
          { text: "Acts", callback_data: `read:${tr}:44-1` },
          { text: "Romans", callback_data: `read:${tr}:45-1` },
        ],
        [
          { text: "1 Corinthians", callback_data: `read:${tr}:46-1` },
          { text: "2 Corinthians", callback_data: `read:${tr}:47-1` },
        ],
        [
          { text: "Galatians", callback_data: `read:${tr}:48-1` },
          { text: "Ephesians", callback_data: `read:${tr}:49-1` },
        ],
        [
          { text: "Philippians", callback_data: `read:${tr}:50-1` },
          { text: "Colossians", callback_data: `read:${tr}:51-1` },
        ],
        [
          { text: "1 Thessalonians", callback_data: `read:${tr}:52-1` },
          { text: "2 Thessalonians", callback_data: `read:${tr}:53-1` },
        ],
        [
          { text: "1 Timothy", callback_data: `read:${tr}:54-1` },
          { text: "2 Timothy", callback_data: `read:${tr}:55-1` },
        ],
        [
          { text: "Titus", callback_data: `read:${tr}:56-1` },
          { text: "Philemon", callback_data: `read:${tr}:57-1` },
        ],
        [
          { text: "Hebrews", callback_data: `read:${tr}:58-1` },
          { text: "James", callback_data: `read:${tr}:59-1` },
        ],
        [
          { text: "1 Peter", callback_data: `read:${tr}:60-1` },
          { text: "2 Peter", callback_data: `read:${tr}:61-1` },
        ],
        [
          { text: "1 John", callback_data: `read:${tr}:62-1` },
          { text: "2 John", callback_data: `read:${tr}:63-1` },
        ],
        [
          { text: "3 John", callback_data: `read:${tr}:64-1` },
          { text: "Jude", callback_data: `read:${tr}:65-1` },
        ],
        [{ text: "Revelation", callback_data: `read:${tr}:66-1` }],
        [{ text: "🔁 Old Testament", callback_data: `read:${tr}:old` }],
        [{ text: "⟵ Testaments", callback_data: `read:${tr}` }],
      ],
    };
  },
};
