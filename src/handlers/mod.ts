import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

import start from "./start.ts";
import { translation } from "./translations.ts";
import { read } from "./read.ts";
import last from "./last.ts";
import toggleMarkdown from "./toggle_markdown.ts";

export const handlers = new Composer<Context>();

handlers.command("start", start);
handlers.use(translation);
handlers.use(read);
handlers.command("last", last);
handlers.command("toggle_markdown", toggleMarkdown);
