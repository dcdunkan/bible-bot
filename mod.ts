import { webhookCallback } from "./deps.ts";
import { bot } from "./src/bot.ts";

const SECRET_PATHNAME = "/" + bot.token;

if (Deno.env.get("DEBUG") != null) {
  bot.catch(console.error);
  bot.start({ drop_pending_updates: true });
} else {
  const handleUpdate = webhookCallback(bot, "std/http");
  await bot.init();
  Deno.serve({
    onError: (error) => {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    },
  }, async (req) => {
    const { pathname } = new URL(req.url);
    if (pathname !== SECRET_PATHNAME && req.method !== "POST") {
      return Response.redirect(`https://t.me/${bot.botInfo.username}`);
    }
    return await handleUpdate(req);
  });
}
