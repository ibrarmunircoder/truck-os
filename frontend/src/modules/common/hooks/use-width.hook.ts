import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Returns maximum theme breakpoint matching current viewport
 */
export const useWidth = (): string => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
