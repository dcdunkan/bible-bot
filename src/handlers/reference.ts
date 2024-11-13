import { InlineKeyboard } from "../../deps.ts";
import { Context } from "../helpers/context.ts";
import { validateRef } from "../helpers/reference_validator.ts";

export default async function (ctx: Context) {
    const text = ctx.message?.text!;
    const ref = validateRef(text);
    if (!ref) {
        return await ctx.reply(
            "🤔 Are you trying to get a reference? \
See /valid_references and make sure you are sending a valid reference, or see /help if you need help.",
        );
    }

    const { book, bookName, chapter, verse } = ref;
    const translation = ctx.session.settings.defaultTranslation;

    const keyboard = new InlineKeyboard();
    if (verse) {
        const page = Math.ceil(verse / ctx.session.settings.versesPerPage);
        keyboard.text(
            "Continue",
            `read:${translation}:${book}:${chapter}-${page}`,
        );
    } else if (chapter) {
        keyboard.text("Continue", `read:${translation}:${book}:${chapter}-1`);
    } else {
        keyboard.text("Continue", `read:${translation}:${book}-1`);
    }

    await ctx.reply(
        `📖 Do you want to open \
<b>${bookName}${chapter ? ` ${chapter}` : ""}${verse ? `:${verse}` : ""}</b>
in your /default translation (${translation.toUpperCase()})?`,
        { reply_markup: keyboard },
    );
}
