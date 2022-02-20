import { Bot, emptyDirSync, session } from "../deps.ts";
import env from "./env.ts";
import { Context, customContextParser } from "./helpers/context.ts";
import { initial, storage } from "./helpers/session.ts";
import { handlers } from "./handlers/mod.ts";
import { fileExists } from "./helpers/cache.ts";

const bot = new Bot<Context>(env.BOT_TOKEN);
bot.use(session({ initial, storage }));

bot.use(customContextParser);
bot.use(handlers);

bot.api.config.use((prev, method, payload) =>
  prev(method, { parse_mode: "HTML", ...payload })
);

bot.catch(console.error);

if (fileExists(".cache")) emptyDirSync(".cache");

bot.start({
  onStart: ({ username }) => console.log(`${username} started.`),
});
