import { serve, webhookCallback } from "./deps.ts";
import { bot } from "./src/bot.ts";

const LOG_CHAT_ID = Deno.env.get("LOG_CHAT_ID");
const runLocally = !!Deno.env.get("DEBUG");

if (runLocally) {
  bot.start({
    drop_pending_updates: true,
    onStart: async ({ username }) => {
      console.log(`${username} started.`);
      if (!LOG_CHAT_ID) return;
      await bot.api.sendMessage(
        parseInt(LOG_CHAT_ID),
        `Logs @${username}\n<code>${
          new Date().toISOString()
        }</code>\nBot started.`,
      );
    },
  });
} else {
  const handleUpdate = webhookCallback(bot, "std/http");
  serve(async (req) => {
    if (req.method == "POST") {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
        return new Response();
      }
    }

    return new Response();
  });
}
