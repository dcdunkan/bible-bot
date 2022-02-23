import { serve, webhookCallback } from "./deps.ts";
import { bot } from "./src/bot.ts";

const LOG_CHAT_ID = Deno.env.get("LOG_CHAT_ID");
const runLocally = !!Deno.env.get("LOCALLY");

if (runLocally) {
  bot.start({
    drop_pending_updates: true,
    onStart: async ({ username }) => await initLog(username),
  });
} else {
  const handleUpdate = webhookCallback(bot, "std/http");
  await bot.init();
  await initLog();

  serve(async (req) => {
    if (req.method == "POST") {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
        return new Response();
      }
    }
    const body =
      `<html><head><title>${bot.botInfo.first_name}</title></head><body><h1>Hey! I'm running here: <a href="https://telegram.me/${bot.botInfo.username}">@${bot.botInfo.username}</a></h1></body></html>`;
    return new Response(body, {
      headers: { "Content-type": "text/html" },
      status: 200,
    });
  });
}

async function initLog(username?: string) {
  if (!LOG_CHAT_ID) return;
  await bot.api.sendMessage(
    parseInt(LOG_CHAT_ID),
    `Logs @${username ?? bot.botInfo.username}\n<code>${
      new Date().toISOString()
    }</code>\nBot started.`,
  );
}
