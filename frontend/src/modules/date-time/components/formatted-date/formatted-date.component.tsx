import { DateFnsLocaleContext } from 'modules/date-time/contexts';
import { formatUtcDate } from 'modules/date-time/utils';
import { memo, useContext } from 'react';

type FormattedDateProps = {
  date: Date | string | number;
  format?: string;
  timezone?: string | undefined | null;
  twoLines?: boolean;
};

export const FormattedDate = memo(({ date, timezone, format = 'Pp', twoLines = false }: FormattedDateProps) => {
  const dateFnsLocale = useContext(DateFnsLocaleContext);

  if (twoLines) {
    const formattedDate = formatUtcDate(date, 'P', timezone, dateFnsLocale);
    const formattedTime = formatUtcDate(date, 'p', timezone, dateFnsLocale);
    return (
      <>
        <span>{formattedDate}</span>
        <br />
        <span>{formattedTime}</span>
      </>
    );
  }

  return <>{formatUtcDate(date, format, timezone, dateFnsLocale)}</>;
});

FormattedDate.displayName = 'FormattedDate';
