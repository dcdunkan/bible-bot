import { Composer } from "../../deps.ts";
import { books } from "../helpers/constants.ts";
import { Context } from "../helpers/context.ts";
import { getBookmarks } from "../helpers/keyboard.ts";

const MAX_BOOKMARKS = 25;

export const bookmark = new Composer<Context>();

bookmark.callbackQuery([
    /bookmark:(\w+):(\d+):(\d+)-(\d+)/,
    /bookmark:(\w+):(\d+):(\d+)-(\d+)-list/,
], async (ctx) => {
    if (!ctx.match) {
        return await ctx.alert("Invalid query. Failed to get the portion.");
    }

    const [, translation, _book, _chapter, _page] = ctx.match;
    const book = parseInt(_book),
        chapter = parseInt(_chapter),
        page = parseInt(_page),
        verse = (page - 1) * ctx.session.settings.versesPerPage + 1;

    const bookmarks = new Map(Object.entries(ctx.session.bookmarks));
    const bkmarkId = `${translation}-${book}-${chapter}-${page}`;
    const old = ctx.callbackQuery.message?.reply_markup?.inline_keyboard[0][1]
        .text;
    const toEdit = ctx.callbackQuery.message?.reply_markup!;

    if (bookmarks.has(bkmarkId)) {
        bookmarks.delete(bkmarkId);

        // If it's a /bookmarks reply list, re-render the list.
        if (ctx.callbackQuery.data.endsWith("-list")) {
            ctx.session.bookmarks = Object.fromEntries(bookmarks);
            if (bookmarks.size === 0) {
                return await ctx.editMessageText(
                    "You haven't bookmarked any verses yet. Click the 🔖 button while reading to bookmark that page.",
                );
            }
            const m = getBookmarks(ctx, Object.values(ctx.session.bookmarks));
            await ctx.answerCallbackQuery();
            return await ctx.editMessageText(m.message, {
                reply_markup: m.keyboard,
            });
        } else {
            await ctx.alert("🔖 Bookmark has been removed succesfully!");
        }

        toEdit.inline_keyboard[0][1].text = "🔖";
    } else {
        if (bookmarks.size >= MAX_BOOKMARKS) {
            return await ctx.alert(
                `You have ${bookmarks.size} bookmarks. You can only store 25 bookmarks at a time. Please remove some to add new bookmarks.`,
            );
        }
        bookmarks.set(bkmarkId, {
            book,
            chapter,
            time: Date.now(),
            translation,
            verse,
        });
        await ctx.alert(
            `🔖 ${books[book - 1]} ${chapter}:${verse} ` +
                `(${translation.toUpperCase()}) has been added to your bookmarks.`,
        );
        toEdit.inline_keyboard[0][1].text = "❌🔖";
    }

    ctx.session.bookmarks = Object.fromEntries(bookmarks);
    if (old !== toEdit.inline_keyboard[0][1].text) {
        return await ctx.editMessageReplyMarkup({
            reply_markup: toEdit,
        });
    }
});

bookmark.command("bookmarks", async (ctx) => {
    const bookmarks = Object.values(ctx.session.bookmarks);
    if (!bookmarks.length) {
        return await ctx.reply(
            "You haven't bookmarked any verses yet. Click the 🔖 button while reading to bookmark that page.",
        );
    }

    const { keyboard, message } = getBookmarks(ctx, bookmarks, 1);
    await ctx.reply(message, { reply_markup: keyboard });
});

bookmark.callbackQuery(/bookmarks:(\d+)/, async (ctx) => {
    if (!ctx.match) {
        return await ctx.alert("Invalid query. Failed to get the bookmarks.");
    }
    const [, _page] = ctx.match;
    const page = parseInt(_page);
    const bookmarks = Object.values(ctx.session.bookmarks);
    const { keyboard, message } = getBookmarks(ctx, bookmarks, page);
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(message, { reply_markup: keyboard });
});
