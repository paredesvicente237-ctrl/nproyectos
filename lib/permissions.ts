export const LOGIN_HISTORY_ADMIN = "nicolas";

export function canViewLoginHistory(username: string | null | undefined) {
  return username?.trim().toLocaleLowerCase("es") === LOGIN_HISTORY_ADMIN;
}
