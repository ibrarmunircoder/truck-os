import { ThemeContext } from 'modules/theme/contexts';
import { ThemeEnum } from 'modules/theme/enums';
import { useCallback, useContext } from 'react';

export interface UseThemeInterface {
  handleThemeChange: () => void;
}

export const useTheme = (): UseThemeInterface => {
  const { currentThemeName, setThemeName } = useContext(ThemeContext);

  const handleThemeChange = useCallback(() => {
    if (currentThemeName === ThemeEnum.LIGHT) {
      setThemeName(ThemeEnum.DARK);
    } else {
      setThemeName(ThemeEnum.LIGHT);
    }
  }, [currentThemeName]);

  return {
    handleThemeChange,
  };
};
