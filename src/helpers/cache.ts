/**
 * The previous version of this Bible bot didn't had a caching system. If it was
 * there, we could reduce the API server calls and get the data even faster.
 * With a proper timeout system, we can cache the scripture data that the user
 * requested, and use them later. The old bot was requesting upto 4 times just
 * for 10 verses each time.
 */

import { dirname, emptyDirSync, join } from "../../deps.ts";

await Deno.mkdir(".cache", { recursive: true });

/**
 * I don't think this is an efficient way to clear the cache based on a time
 * interval. But it works. Anyway, I thought about checking the creation time of
 * the file and comparing it to the current time. But, as far as I checked, it's
 * inefficient since it has to check all the files. Another way is to set a
 * timeout for the cached file when creating it. But, it's almost the same,
 * right? I don't know. If you have any idea, please let me know.
 */
setInterval(() => {
  if (fileExists(".cache")) emptyDirSync(".cache");
}, 1000 * 60 * 60 * 6); // A 6-hour interval to clear the cache.

export function isCached(path: string): boolean {
  return fileExists(getPath(path));
}

export function fileExists(path: string): boolean {
  try {
    Deno.statSync(path);
    return true;
  } catch {
    return false;
  }
}

function getPath(url: string): string {
  const structure = url.split("/");
  return join(".cache", ...structure);
}

export function getCache<T = void>(path: string): T | undefined {
  path = getPath(path);
  if (!fileExists(path)) return;
  return JSON.parse(Deno.readTextFileSync(path));
}

export function writeCache(
  path: string,
  content: Record<string, unknown>,
): string | undefined {
  path = getPath(path);
  Deno.mkdirSync(dirname(path), { recursive: true });
  try {
    Deno.writeTextFileSync(path, JSON.stringify(content));
    return path;
  } catch {
    return undefined;
  }
}
