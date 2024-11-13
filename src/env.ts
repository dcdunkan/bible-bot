import { load } from "https://deno.land/std@0.196.0/dotenv/mod.ts";

await load({ export: true });

function env<T extends string>(...vars: T[]) {
    return vars.reduce((result, variable): Record<T, string> => {
        const value = Deno.env.get(variable);
        if (value == null) throw new Error("Missing env var: " + variable);
        return { ...result, [variable]: value };
    }, {} as Record<T, string>);
}

export default env("BOT_TOKEN", "DETA_KEY");
