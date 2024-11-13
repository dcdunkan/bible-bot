import { Context } from "../helpers/context.ts";

const message = (ctx: Context) =>
    `The main purpose of this bot is to help you <b>read the whole \
Bible inside Telegram, with support for over 80 different translations</b>.

📖 You can use the /translations command to see the available translations. By choosing the \
translation you want to use, you can start reading. Or, if you want to start \
reading with the default translation (${ctx.session.settings.defaultTranslation.toUpperCase()}), \
you can use the /read command, then choose a book, a chapter, and that's it!

⌨️ You can also send a Bible reference and the bot will show you that passage. See the \
supported booknames in the /valid_references command.

But there's more, actually. Here's all the commands:
/translations — List of available translations.
/read — Start reading!
/last — Go to what you last read.
/bookmarks — List of your bookmarks.
/default — Change the default translation.
/settings — Change the settings of the bot.
/valid_references — Valid references for requesting.
/about — See the about of the bot.
/toggle_markdown — Toggle the markdown mode.
/help — This message.

<b><u>Symbols used</u></b>
🔖 Bookmark
❌🔖 Remove bookmark
<b>#</b> Chapters list
📚 Books list
🗣 Translations`;

export default async function (ctx: Context) {
    await ctx.reply(message(ctx));
}
