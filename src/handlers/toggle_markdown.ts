import { Context } from "../helpers/context.ts";

export default async function (ctx: Context): Promise<void> {
  ctx.session.settings.markdownedVerse = !ctx.session.settings.markdownedVerse;
  await ctx.reply(
    `📖 Markdown formatting for verses is now <b>${
      !ctx.session.settings.markdownedVerse ? "disabled" : "enabled"
    }</b>. Use /toggle_markdown again to ${
      !ctx.session.settings.markdownedVerse ? "enable" : "disable"
    } it. This helps you to copy verses by simply clicking on them.`,
  );
}
