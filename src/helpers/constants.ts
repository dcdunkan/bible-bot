// deno-fmt-ignore-file
export const VERSION = "4.0.0";

export const chapters = [
  50, 40, 27, 36, 34,  24, 21,  4, 31, 24, 22, 25, 29,
  36, 10, 13, 10, 42, 150, 31, 12,  8, 66, 52,  5, 48,
  12, 14,  3,  9,  1,   4,  7,  3,  3,  3,  2, 14,  4,
  28, 16, 24, 21, 28,  16, 16, 13,  6,  6,  4,  4,  5,
   3,  6,  4,  3,  1,  13,  5,  5,  3,  5,  1,  1,  1,
  22
];

export const books = [
  "Genesis",         "Exodus",        "Leviticus",     "Numbers",
  "Deuteronomy",     "Joshua",        "Judges",        "Ruth",
  "1 Samuel",        "2 Samuel",      "1 Kings",       "2 Kings",
  "1 Chronicles",    "2 Chronicles",  "Ezra",          "Nehemiah",
  "Esther",          "Job",           "Psalms",        "Proverbs",
  "Ecclesiastes",    "Song of Songs", "Isaiah",        "Jeremiah",
  "Lamentations",    "Ezekiel",       "Daniel",        "Hosea",
  "Joel",            "Amos",          "Obadiah",       "Jonah",
  "Micah",           "Nahum",         "Habakkuk",      "Zephaniah",
  "Haggai",          "Zechariah",     "Malachi",       "Matthew",
  "Mark",            "Luke",          "John",          "Acts of Apostles",
  "Romans",          "1 Corinthians", "2 Corinthians", "Galatians",
  "Ephesians",       "Philippians",   "Colossians",    "1 Thessalonians",
  "2 Thessalonians", "1 Timothy",     "2 Timothy",     "Titus",
  "Philemon",        "Hebrews",       "James",         "1 Peter",
  "2 Peter",         "1 John",        "2 John",        "3 John",
  "Jude",            "Revelation"
];

/** https://www.logos.com/bible-book-abbreviations (Most common) */
export const booksAbbr = [
  "Gen",     "Ex",      "Lev",     "Num",     "Deut",
  "Josh",    "Judg",    "Ruth",    "1 Sam",   "2 Sam",
  "1 Kings", "2 Kings", "1 Chron", "2 Chron", "Ezra",
  "Neh",     "Est",     "Job",     "Ps",      "Prov",
  "Eccles",  "Song",    "Isa",     "Jer",     "Lam",
  "Ezek",    "Dan",     "Hos",     "Joel",    "Amos",
  "Obad",    "Jonah",   "Mic",     "Nah",     "Hab",
  "Zeph",    "Hag",     "Zech",    "Mal",     "Matt",
  "Mark",    "Luke",    "John",    "Acts",    "Rom",
  "1 Cor",   "2 Cor",   "Gal",     "Eph",     "Phil",
  "Col",     "1 Thess", "2 Thess", "1 Tim",   "2 Tim",
  "Titus",   "Philem",  "Heb",     "James",   "1 Peter",
  "2 Peter", "1 John",  "2 John",  "3 John",  "Jude",
  "Rev"
];

export const booksAbbr2 = [
  "Ge",     "Exo",     "Le",      "Num",    "Deu",
  "Josh",   "Jud",     "Rt",      "1 Sam",  "2 Sam",
  "1 King", "2 King",  "1 Chro",  "2 Chro", "Ez",
  "Neh",    "Est",     "Jb",      "Ps",     "Prov",
  "Eccl",   "Songs",   "Isa",     "Jer",    "Lam",
  "Ezek",   "Dan",     "Ho",      "Joel",   "Amos",
  "Obad",   "Jonah",   "Mi",      "Nah",    "Hab",
  "Zeph",   "Hag",     "Zech",    "Mal",    "Matt",
  "Mk",     "Lk",      "Jn",      "Act",    "Rom",
  "1 Cor",  "2 Cor",   "Gal",     "Eph",    "Phil",
  "Col",    "1 Thes",  "2 Thes",  "1 Tim",  "2 Tim",
  "Tit",    "Philem",  "Heb",     "Jm",     "1 Pet",
  "2 Pet",  "1 Jn",    "2 Jn",    "3 Jn",   "Jud",
  "Re"
];

export const commands = [
  { command: "read", description: "Start reading in default translation" },
  { command: "help", description: "Help message" },
  { command: "translations", description: "List all translations" },
  { command: "last", description: "Go to last read passage" },
  { command: "bookmarks", description: "Saved bookmarks" }, 
  { command: "default", description: "Change default translation" },
  { command: "settings", description: "Customize settings" },
]
