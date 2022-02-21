import { Composer, InlineKeyboard } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const settings = new Composer<Context>();

const settingsMsg = (ctx: Context) => {
  return `⚙️ <b>Settings</b>
You can customize your experience by changing the settings below. \
If you have any suggestions regarding "Customizing experience" please see /about section for contact details.
  
— <b>Verses per page</b>
Currently, bot displays maximum ${ctx.session.settings.versesPerPage} verses per page. \
You can change this value by clicking the "Verses per page: ${ctx.session.settings.versesPerPage}" button.
— <b>Markdown</b>
Markdown formatted verses are ${
    ctx.session.settings.markdownedVerse ? "enabled" : "disabled"
  }. \
Click the button to toggle this setting. Or use /toggle_markdown command.
— <b>Default Translation</b>
Currently your default translation is set to ${ctx.session.settings.defaultTranslation.toUpperCase()}. \
Use the command, /default to change the default translation.`;
};

const settingsKeyboard = (ctx: Context) => {
  return new InlineKeyboard()
    .text(
      `Verses per page: ${ctx.session.settings.versesPerPage}`,
      "settings:versesPerPage",
    )
    .row()
    .text(
      `Markdown: ${
        ctx.session.settings.markdownedVerse ? "Enabled" : "Disabled"
      }`,
      "settings:markdownedVerse",
    );
};

settings.command("settings", async (ctx) => {
  await ctx.reply(settingsMsg(ctx), { reply_markup: settingsKeyboard(ctx) });
});

settings.callbackQuery("settings:versesPerPage", async (ctx) => {
  const supported = [1, 2, 5, 10, 15, 20];
  const current = ctx.session.settings.versesPerPage;
  const next = supported[(supported.indexOf(current) + 1) % supported.length];
  ctx.session.settings.versesPerPage = next;
  await ctx.editMessageText(settingsMsg(ctx), {
    reply_markup: settingsKeyboard(ctx),
  });
});

settings.callbackQuery("settings:markdownedVerse", async (ctx) => {
  ctx.session.settings.markdownedVerse = !ctx.session.settings.markdownedVerse;
  await ctx.editMessageText(settingsMsg(ctx), {
    reply_markup: settingsKeyboard(ctx),
  });
});
