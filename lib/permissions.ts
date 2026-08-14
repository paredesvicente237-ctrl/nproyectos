export const LOGIN_HISTORY_ADMINS = new Set(["nicolas", "vicente"]);

export function canViewLoginHistory(username: string | null | undefined) {
  return LOGIN_HISTORY_ADMINS.has(username?.trim().toLocaleLowerCase("es") ?? "");
}
