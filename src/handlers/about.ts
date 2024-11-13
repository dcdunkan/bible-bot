import { VERSION } from "../helpers/constants.ts";
import { Context } from "../helpers/context.ts";

const message = `📨 <b><u>About the bot</u></b>
This bot can help you read the whole Bible inside Telegram, with support for \
over 80 different translations. See /help for to know how to use this bot and \
all the available commands.

📚 <b>Open-source</b>
Ths bot is completely open-source and you can find the source code here at \
github.com/dcdunkan/bible-bot.

⚙️ <b>Built with</b>
— <a href="https://grammy.dev">grammY</a>: The Telegram bot framework.
— <a href="https://getbible.net">GetBible.net API</a>: The Bible API.
— <a href="https://deta.space">Deta Base</a>: Free, unlimited database service.

ℹ️ <b>More info</b>
— Bot version: <code>${VERSION}</code>.
— Programming language: <a href="https://typescriptlang.org/">TypeScript</a>.
— Runs on <a href="https://deno.land">Deno</a>.
— Hosted on <a href="https://deno.com/deploy">Deno Deploy</a>.

Created by @dcdunkan (Dunkan) from @dcbots. Join and support the channel for future updates!
Made with ❤️ in memory of my friend Shamil.

If you're facing issues or if you have suggestions open an issue \
<a href="https://github.com/dcdunkan/bible-bot/issues">here on GitHub</a> or \
report it to @dcdunkan.`;

export default async function (ctx: Context) {
    await ctx.reply(message);
}
