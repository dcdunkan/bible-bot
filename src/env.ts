import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { cleanEnv, str } from "../deps.ts";

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  DETA_KEY: str(),
});
