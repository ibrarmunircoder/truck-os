import { useTheme } from '@mui/material/styles';
import { useScreenFrameStyles } from 'layouts/auth/partials/screen-frame/screen-frame.styles';
import Image from 'next/image'
import { FunctionComponent, useMemo } from 'react';

export interface ScreenFrameInterface {}

export const ScreenFrame: FunctionComponent<ScreenFrameInterface> = () => {
  const theme = useTheme();
  const classes = useScreenFrameStyles();

  const imageSrc = useMemo(
    () =>
      theme.palette.mode === 'light'
        ? '/static/images/login-screen-frame-light.png'
        : '/static/images/login-screen-frame-dark.png',
    [theme.palette.mode],
  );


  return (
    <Image
      className={classes.image}
      src={imageSrc}
      width={865}
      height={348}
      alt='ROQ Login'
    />
  );
};
