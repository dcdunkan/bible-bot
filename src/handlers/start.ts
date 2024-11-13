import { Context } from "../helpers/context.ts";

export default async function (ctx: Context): Promise<void> {
    await ctx.reply(
        `👋🏽 Hello there! \
I can help you to /read the whole Bible inside Telegram. \
I currently support more than 80 /translations and languages.

/read — Start reading in ${ctx.session.settings.defaultTranslation.toUpperCase()}.
/translations — List all available translations.
/default — Set the default translation.

See the detailed /help message for more commands.`,
    );
}
