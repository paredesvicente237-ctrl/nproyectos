export const LOGIN_HISTORY_ADMINS = new Set(["nicolas", "vicente"]);
export const EXCLUSIVE_ACCESS_ADMIN = "nicolas";
export const QUOTE_HISTORY_ADMIN = "nicolas";

export function canViewLoginHistory(username: string | null | undefined) {
  return LOGIN_HISTORY_ADMINS.has(username?.trim().toLocaleLowerCase("es") ?? "");
}

export function canManageExclusiveAccess(username: string | null | undefined) {
  return username?.trim().toLocaleLowerCase("es") === EXCLUSIVE_ACCESS_ADMIN;
}

export function canViewQuoteHistory(username: string | null | undefined) {
  return username?.trim().toLocaleLowerCase("es") === QUOTE_HISTORY_ADMIN;
}
