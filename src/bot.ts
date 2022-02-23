import { Bot, GrammyError, HttpError, session } from "../deps.ts";
import env from "./env.ts";
import { Context, customContextParser } from "./helpers/context.ts";
import { initial, storage } from "./helpers/session.ts";
import { handlers } from "./handlers/mod.ts";
import { commands } from "./helpers/constants.ts";

export const bot = new Bot<Context>(env.BOT_TOKEN);
bot.use(session({ initial, storage }));

bot.use(customContextParser);
bot.use(handlers);

bot.api.config.use((prev, method, payload) =>
  prev(method, { parse_mode: "HTML", ...payload })
);

bot.catch(async ({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
    await ctx.log(`Error in request: ${error.description}`);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
    await ctx.log(`Could not contact Telegram: ${error}`);
  } else {
    console.error("Unknown error:", error);
    await ctx.log(`Unknown error: ${error}`);
  }
});

const currentCommands = await bot.api.getMyCommands();
if (currentCommands.length === 0) {
  await bot.api.setMyCommands(commands, {
    scope: {
      type: "all_private_chats",
    },
  });
}
