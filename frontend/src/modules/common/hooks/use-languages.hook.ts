import { LanguageInterface, languages } from 'configuration/data';
import { useMemo } from 'react';

export const useLanguages = (): LanguageInterface[] => useMemo(() => languages, []);
