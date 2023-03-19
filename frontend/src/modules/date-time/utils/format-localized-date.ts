import { i18n, publicConfig } from 'configuration/app';

export const formatLocalizedDate = (timestamp: string | Date, locale: string, timezone: string): string => {
  const thisTimezone = timezone ?? publicConfig.timezone.default;
  const thisLocale = locale ?? i18n.defaultLocale;
  const date = new Date(timestamp);
  let formatOptions;

  if(thisLocale === 'de-DE'){
    formatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: thisTimezone
    }
  }else{
    formatOptions = {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: thisTimezone,
    }
  }

  return date.toLocaleDateString(thisLocale, formatOptions);
}
