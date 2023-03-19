export const SELECTED_LOCALE_KEY = 'selectedLocale';

export const saveSelectedLocale = (locale: string): void => localStorage.setItem(SELECTED_LOCALE_KEY, locale)
export const getSelectedLocale = (): string | null => localStorage.getItem(SELECTED_LOCALE_KEY) || null;
