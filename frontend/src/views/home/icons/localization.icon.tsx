import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

export const LocalizationIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon {...props}>
    <path d="M13 3H3V13H13L14 16H21V6H14L13 3Z" fill="#2FBDEA" fillOpacity="0.5" stroke="#2FBDEA" strokeWidth="2" />
    <path d="M3 13C3 13 3 19.0948 3 23" stroke="#2FBDEA" strokeWidth="2" />
  </SvgIcon>
);
