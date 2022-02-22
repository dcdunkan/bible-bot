import {
  BaseContext,
  Message,
  NextFunction,
  SessionFlavor,
} from "../../deps.ts";
import { SessionData } from "./session.ts";
import { sanitize } from "../helpers/utils.ts";

const LOG_CHAT_ID = Deno.env.get("LOG_CHAT_ID");
interface CustomContext {
  /**
   * An equivalent for `answerCallbackQuery` with `show_alert: true`. Creating
   * an alias for it since using it a lot.
   * @param text The alert text content (reason).
   */
  alert(text: string): Promise<true>;
  /**
   * Logs the given message to specified logging chat ID, where the bot
   * has permission to send messages.
   * @param message Log content.
   */
  log(...message: string[]): Promise<Message.TextMessage | undefined>;
}

export async function customContextParser(ctx: Context, next: NextFunction) {
  if (ctx.callbackQuery) {
    ctx.alert = async (text: string) => {
      return await ctx.answerCallbackQuery({
        text,
        show_alert: true,
      });
    };

    ctx.log = async (...message: string[]) => {
      if (!LOG_CHAT_ID) return;
      return await ctx.api.sendMessage(
        parseInt(LOG_CHAT_ID),
        `Logs @${ctx.me.username}
<code>${new Date().toISOString()}</code>

<pre><code>${sanitize(message.join(" ").substring(0, 3512))}</code></pre>`,
      );
    };
  }

  await next();
}

export type Context =
  & BaseContext
  & SessionFlavor<SessionData>
  & CustomContext;
