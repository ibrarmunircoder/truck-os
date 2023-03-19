import { countries, CountryType } from 'configuration/data';
import { useMemo } from 'react';

export const useCountries = (): CountryType[] => useMemo(() => countries, []);
