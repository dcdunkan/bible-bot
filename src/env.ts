import "https://deno.land/std@0.196.0/dotenv/load.ts";
import { cleanEnv, str } from "../deps.ts";

const specs = {
  BOT_TOKEN: str(),
  DETA_KEY: str(),
};

export default cleanEnv(Deno.env.toObject(), specs);
