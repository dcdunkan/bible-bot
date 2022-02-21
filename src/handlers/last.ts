import { InlineKeyboard } from "../../deps.ts";
import { books } from "../helpers/constants.ts";
import { Context } from "../helpers/context.ts";
import { timeDistanceToNow } from "../helpers/utils.ts";

export default async function (ctx: Context): Promise<void> {
  const { book, chapter, verse, translation } = ctx.session.lastRead;
  const page = Math.ceil(verse / ctx.session.settings.versesPerPage);
  const diff = timeDistanceToNow(ctx.session.lastRead.time);

  const message = (book === 43 && chapter === 3 && verse === 16)
    ? `Would you like to open <b>John 3:16</b>?`
    : `Ah, I see. You were reading <b>${books[book - 1]} ` +
      `${chapter}:${verse}</b> in <b>${translation.toUpperCase()}</b> ` +
      `${diff} ago. Click the button below to continue reading.`;

  const keyboard = new InlineKeyboard();
  keyboard.text("Continue", `read:${translation}:${book}:${chapter}-${page}`);

  await ctx.reply(message, { reply_markup: keyboard });
}
