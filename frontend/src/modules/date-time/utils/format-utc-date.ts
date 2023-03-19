import { publicConfig } from 'configuration/app';
import { parseISO } from 'date-fns';
import { format as dateFnsTzFormat, utcToZonedTime } from 'date-fns-tz';

// on client side we just use undefined as fallback timezone, so that browser settings are used for formatting
let fallbackTimezone: string | undefined;

// on server side we do not have real user timezone, so we fallback to default one
if (typeof window === 'undefined') {
  fallbackTimezone = publicConfig.timezone.default;
}

export const formatUtcDate = (
  rawDate: string | Date |number,
  format: string,
  timezone?: string | null,
  dateFnsLocale?: Locale | undefined | null
): string => {
  const thisTimezone = timezone ?? fallbackTimezone;
  const date = typeof rawDate === 'string' ? parseISO(rawDate) : rawDate;

  return dateFnsTzFormat(
    timezone ? utcToZonedTime(date, thisTimezone) : date,
    format,
    { timeZone: thisTimezone, locale: dateFnsLocale }
  );
};
