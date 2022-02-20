export const sanitize = (str: string) =>
  str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
