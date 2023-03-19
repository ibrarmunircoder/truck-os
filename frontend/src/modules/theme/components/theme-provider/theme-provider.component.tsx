import { Theme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext, ThemeContextInterface } from 'modules/theme/contexts/theme.context';
import { ThemeEnum } from 'modules/theme/enums';
import { themeNameSelector } from 'modules/theme/selectors';
import { switchThemeAction } from 'modules/theme/theme.slice';
import React, { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ThemeProviderInterface {
  children: ReactNode;
  darkTheme: Theme;
  lightTheme: Theme;
}

export const ThemeProvider: FunctionComponent<ThemeProviderInterface> = (props: ThemeProviderInterface) => {
  const { children, lightTheme, darkTheme } = props;
  const isDarkPreferred = useMediaQuery('(prefers-color-scheme: dark)')
  const dispatch = useDispatch();
  const currentThemeName = useSelector(themeNameSelector) || (isDarkPreferred ? ThemeEnum.DARK : ThemeEnum.LIGHT);
  const theme = useMemo(
    () => currentThemeName === ThemeEnum.LIGHT ? lightTheme : darkTheme,
    [currentThemeName, lightTheme, darkTheme]
  );
  const setThemeName = useCallback((name: string) => {
    dispatch(switchThemeAction(name));
  }, [ dispatch ]);

  const contextValue: ThemeContextInterface = {
    currentThemeName,
    setThemeName,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
