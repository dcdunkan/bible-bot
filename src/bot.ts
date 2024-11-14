import env from "./env.ts";
import { Bot, session } from "../deps.ts";
import { Context, customContextMethods } from "./helpers/context.ts";
import { initial, storage } from "./helpers/session.ts";
import { handlers } from "./handlers/mod.ts";
import { PRIVATE_CHAT_COMMANDS } from "./helpers/constants.ts";

export const bot = new Bot<Context>(env.BOT_TOKEN);
bot.use(session({ initial, storage }));

bot.use(customContextMethods);
bot.use(handlers);

bot.api.config.use((prev, method, payload) =>
    prev(method, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        allow_sending_without_reply: true,
        ...payload,
    })
);

await bot.api.setMyCommands(PRIVATE_CHAT_COMMANDS, {
    scope: { type: "all_private_chats" },
});
