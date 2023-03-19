import { StoreInterface } from 'configuration/redux/store';
import { ThemeStateInterface } from 'modules/theme/theme.slice';
import { ThemeName } from 'modules/theme/types';
import { createSelector } from 'reselect';

export const themeNameSelector = createSelector<[(state: StoreInterface) => ThemeStateInterface], ThemeName>(
  (state) => state.theme,
  (values) => values.name,
);
