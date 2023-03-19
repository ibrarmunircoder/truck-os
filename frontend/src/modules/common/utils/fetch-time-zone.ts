export function fetchTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
