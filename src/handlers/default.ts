import { Composer, InlineKeyboard } from "../../deps.ts";
import { Context } from "../helpers/context.ts";
import { getTranslationsKeyboard } from "../helpers/keyboard.ts";

export const defaultH = new Composer<Context>();

defaultH.command("default", async (ctx) => {
    const keyboard = new InlineKeyboard().text(
        "Change Default",
        "default-tr:1",
    );

    if (ctx.session.settings.defaultTranslation !== "kjv") {
        keyboard.row().text("Reset to Default (KJV)", "set-def:kjv");
    }

    await ctx.reply(
        `⚙️ This feature helps you to set a default translation. \
Then when using /read or requesting a reference, this translation will be used. \
Currently, the default translation is set to \
<b>${ctx.session.settings.defaultTranslation.toUpperCase()}</b>.`,
        { reply_markup: keyboard },
    );
});

defaultH.callbackQuery(/default-tr:(\d+)/, async (ctx) => {
    const page = parseInt(ctx.match![1]);
    const results = await getTranslationsKeyboard(
        page,
        "set-def",
        "default-tr",
    );
    if (!results) {
        return await ctx.alert("Failed to fetch translations at the moment.");
    }

    const { keyboard, lastPage, total, onPage } = results;
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(
        `Choose Default › <b>Translations</b>\nPage ${page} of ${lastPage}
Showing ${onPage} translations of ${total}`,
        { reply_markup: keyboard },
    );
});

defaultH.callbackQuery(/set-def:(\w+)/, async (ctx) => {
    const translation = ctx.match![1];
    ctx.session.settings.defaultTranslation = translation;
    await ctx.alert(
        `🎉 Default translation set successfully to ${translation.toUpperCase()}.`,
    );
    const keyboard = new InlineKeyboard().text(
        "Change Default",
        "default-tr:1",
    );

    if (ctx.session.settings.defaultTranslation !== "kjv") {
        keyboard.row().text("Reset to Default (KJV)", "set-def:kjv");
    }
    await ctx.editMessageText(
        `⚙️ This feature helps you to set a default translation. \
Then when using /read or requesting a reference, this translation will be used. \
Currently, the default translation is set to \
<b>${ctx.session.settings.defaultTranslation.toUpperCase()}</b>.`,
        { reply_markup: keyboard },
    );
});
