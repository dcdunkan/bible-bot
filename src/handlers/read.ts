import { Context } from "../helpers/context.ts";
import { Composer, InlineKeyboard } from "../../deps.ts";
import { getVerses } from "../helpers/api.ts";
import { books, chapters } from "../helpers/constants.ts";
import { getChaptersKeyboard, keyboards } from "../helpers/keyboard.ts";
import { sanitize } from "../helpers/utils.ts";

export const read = new Composer<Context>();

read.command("read", async (ctx) => {
  const translation = ctx.session.settings.defaultTranslation;
  await ctx.reply(
    `${translation.toUpperCase()} › <b>Testaments</b>\nChoose a testament to list the books.`,
    {
      reply_markup: new InlineKeyboard()
        .text("Old Testament", `read:${translation}:old`)
        .text("New Testament", `read:${translation}:new`)
        .row()
        .text("🗣 Translations", "tr:1"),
    },
  );
});

// Action after the user has selected a chapter.
read.callbackQuery(/read:(\w+):(\d+):(\d+)-(\d+)/, async (ctx) => {
  if (!ctx.match) {
    return await ctx.alert("Invalid query. Failed to get the verses.");
  }

  const [, translation, _book, _chapter, _page] = ctx.match;
  const book = parseInt(_book),
    chapter = parseInt(_chapter),
    page = parseInt(_page);
  const PER_PAGE = ctx.session.settings.versesPerPage;

  const start = PER_PAGE * (page - 1), end = PER_PAGE * page;

  const data = await getVerses(translation, book, chapter, start, end);
  if (!data) return await ctx.alert("Failed to get the verses.");

  const { verses, total } = data;
  if (verses.length === 0) {
    await ctx.alert(
      "Sorry, I couldn't get the requested verses. Please click the button again.",
    );
    return await ctx.editMessageText(
      `📖 Do you want to open \
<b>${books[book - 1]} ${chapter}</b>
in your /default translation (${translation.toUpperCase()})?`,
      {
        reply_markup: new InlineKeyboard()
          .text("Continue", `read:${translation}:${book}:${chapter}-1`),
      },
    );
  }

  await ctx.answerCallbackQuery();

  const viewedVerses = start + verses.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const totalChapters = chapters[book - 1];

  const isThereNextPage = viewedVerses !== total;
  const isTherePreviousPage = page !== 1;
  const isThereNextBook = book < 66;
  const isTherePreviousBook = book > 1;
  const isThereNextChapter = chapter < totalChapters;
  const isTherePreviousChapter = chapter > 1;

  let message = `<b>${data.name}</b>\n` +
    `${data.language}: ${data.translation}\n` +
    `${totalPages !== 1 ? `Page ${page} of ${totalPages}\n` : ""}` +
    `<i>Showing ${verses.length} verses of ${data.total}</i>\n`;

  const mdVerse = ctx.session.settings.markdownedVerse;
  for (let i = 0; i < verses.length; i++) {
    if (!verses[i]) break;
    const { verse, text } = verses[i];
    message += `\n<b>${verse}</b> ${
      mdVerse ? `<code>${sanitize(text.trim())}</code>` : sanitize(text.trim())
    }`;
  }

  const keyboard = new InlineKeyboard();

  if (isTherePreviousPage) {
    keyboard.text(
      "￩ Previous",
      `read:${translation}:${book}:${chapter}-${page - 1}`,
    );
  } else if (isTherePreviousChapter) {
    keyboard.text(
      `￩ ${chapter - 1}`,
      `read:${translation}:${book}:${chapter - 1}-1`,
    );
  } else if (isTherePreviousBook) {
    keyboard.text(`￩ ${books[book - 2]}`, `read:${translation}:${book - 1}-1`);
  } else {
    keyboard.text(`￩ Relevations`, `read:${translation}:66-1`);
  }
  const bookmarks = new Map(Object.entries(ctx.session.bookmarks));
  const bkmarkId = `${translation}-${book}-${chapter}-${page}`;

  keyboard.text(
    bookmarks.has(bkmarkId) ? "❌🔖" : "🔖",
    `bookmark:${translation}:${book}:${chapter}-${page}`,
  );

  if (isThereNextPage) {
    keyboard.text(
      "Next ￫",
      `read:${translation}:${book}:${chapter}-${page + 1}`,
    );
  } else if (isThereNextChapter) {
    keyboard.text(
      `${chapter + 1} ￫`,
      `read:${translation}:${book}:${chapter + 1}-1`,
    );
  } else if (isThereNextBook) {
    keyboard.text(`${books[book]} ￫`, `read:${translation}:${book + 1}-1`);
  } else {
    keyboard.text(`Genesis ￫`, `read:${translation}:1-1`);
  }

  keyboard.row()
    .text("⟵", `read:${translation}:${book}-${Math.ceil(chapter / 48)}`)
    .text("#", `read:${translation}:${book}-1`)
    .text("📚", `read:${translation}`)
    .text("🗣", `tr:1`);

  ctx.session.lastRead = {
    translation,
    book,
    chapter,
    verse: verses[0].verse,
    time: Date.now(),
  };

  await ctx.editMessageText(message, { reply_markup: keyboard });
});

// Action after the user has selected a book.
read.callbackQuery(/read:(\w+):(\d+)\-(\d+)/, async (ctx) => {
  if (!ctx.match) {
    return await ctx.alert("Invalid query. Failed to get chapters.");
  }

  const [, translation, book, page] = ctx.match;
  const chapters = await getChaptersKeyboard(
    translation,
    parseInt(book),
    parseInt(page),
  );
  if (!chapters) {
    return await ctx.alert("Sorry, I couldn't get the chapter information.");
  }

  await ctx.answerCallbackQuery();

  const { lastPage, tr, book_name, language, onPage, total } = chapters;
  await ctx.editMessageText(
    `Books › <b>${book_name}</b>\n` +
      `${tr}: ${language}\n` +
      `${lastPage !== 1 ? `\nPage ${page} of ${lastPage}` : ""}\n` +
      `Showing ${onPage} chapters of ${total}`,
    { reply_markup: chapters.keyboard },
  );
});

// Action after the user has selected a testament.
read.callbackQuery(/read:(\w+):(\w+)/, async (ctx) => {
  if (!ctx.match) {
    return await ctx.alert("Failed to get the books.");
  }

  const translation = ctx.match[1];
  const testament = ctx.match[2] as "old" | "new";

  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    `${testament[0].toUpperCase()}${
      testament.substring(1)
    } Testament › <b>Books</b>\nChoose a book to read.`,
    { reply_markup: keyboards[`${testament}Tstmnt`](translation) },
  );
});

// Action after the user has selected a translation.
read.callbackQuery(/read:(\w+)/, async (ctx) => {
  if (!ctx.match) {
    return await ctx.alert("Invalid translation. Failed to get the books.");
  }

  const translation = ctx.match[1];
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "Translations › <b>Testaments</b>\nChoose a testament to list the books.",
    {
      reply_markup: new InlineKeyboard()
        .text("Old Testament", `read:${translation}:old`)
        .text("New Testament", `read:${translation}:new`)
        .row()
        .text("⟵ Back to Translations", "tr:1"),
    },
  );
});
