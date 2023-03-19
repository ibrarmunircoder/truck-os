import Box from '@mui/material/Box';
import { FunctionComponent, HTMLAttributes } from 'react';

export interface ChatMessageDateGroupItemInterface extends HTMLAttributes<HTMLDivElement> {
  date: Date;
}

/* const formatDate = (d: Date, timezone: string, dateFnsLocale?: Locale): string => {
  const duration = differenceInDays(d, new Date());

  // “Today” if there are messages from today
  if (isToday(d)) {
    return 'Today';
  }

  // “Yesterday” if there are messages from yesterday
  if (isYesterday((d))) {
    return 'Yesterday';
  }

  // The weekday (for example “Wednesday”) if there are messages from within the last 7 days.
  // This means that if today is Sunday, the day label for last Sunday will contain the exact date
  if (duration >= -7) {
    return formatUtcDate(d, 'EEEE', timezone, dateFnsLocale);
  }

  // The exact date if it was more than 7 days ago
  return formatUtcDate(d, 'P', timezone, dateFnsLocale);
}; */

export const MessageDateGroupItemPartial: FunctionComponent<ChatMessageDateGroupItemInterface> = ({
children,
  ...rest
}) => (
    <Box display="flex" flexDirection="column" {...rest}>
      {/*<Box><Typography variant="body2">{formatDate(date, timezone)}</Typography></Box>*/}
      <Box  display="flex" flexDirection="column" rowGap={4}>{children}</Box>
    </Box>
  );
