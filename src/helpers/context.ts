import { BaseContext, NextFunction, SessionFlavor } from "../../deps.ts";
import { SessionData } from "./session.ts";

interface CustomContext {
    /**
     * An equivalent for `answerCallbackQuery` with `show_alert: true`. Creating
     * an alias for it since using it a lot.
     * @param text The alert text content (reason).
     */
    alert(text: string): Promise<true>;
}

export async function customContextMethods(
    ctx: Context,
    next: NextFunction,
) {
    if (ctx.callbackQuery) {
        ctx.alert = (text: string) =>
            ctx.answerCallbackQuery({ text, show_alert: true });
    }
    await next();
}

export type Context =
    & BaseContext
    & SessionFlavor<SessionData>
    & CustomContext;
