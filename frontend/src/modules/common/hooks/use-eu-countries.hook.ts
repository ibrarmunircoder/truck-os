import { CountryType, euCountries } from 'configuration/data';
import { useMemo } from 'react';

export const useEuCountries = (): CountryType[] => useMemo(() => euCountries, []);
