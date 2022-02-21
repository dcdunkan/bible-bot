import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";
import { getTranslationsKeyboard } from "../helpers/keyboard.ts";

export const translation = new Composer<Context>();

translation.command("translations", async (ctx) => {
  const { message_id } = await ctx.reply("Getting translations...");

  const results = await getTranslationsKeyboard(1, "read", "tr");
  if (!results) {
    return await ctx.api.editMessageText(
      ctx.chat?.id!,
      message_id,
      "Failed to fetch translations at the moment.",
    );
  }

  const { keyboard, lastPage, total, onPage } = results;
  await ctx.api.editMessageText(
    ctx.chat?.id!,
    message_id,
    `<b>Translations</b>\nPage 1 of ${lastPage}
Showing ${onPage} translations of ${total}`,
    { reply_markup: keyboard },
  );
});

translation.callbackQuery(/^tr:(\d+)/, async (ctx) => {
  const page = parseInt(ctx.match![1]);
  const results = await getTranslationsKeyboard(page, "read", "tr");
  if (!results) {
    return await ctx.alert("Failed to fetch translations at the moment.");
  }

  const { keyboard, lastPage, total, onPage } = results;
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    `<b>Translations</b>\nPage ${page} of ${lastPage}
Showing ${onPage} translations of ${total}`,
    { reply_markup: keyboard },
  );
});
