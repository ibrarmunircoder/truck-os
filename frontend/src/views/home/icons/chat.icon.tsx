import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

export const ChatIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon
    sx={{
      color: 'transparent',
    }}
    {...props}
  >
    <path
      d="M6.24279 16.2954L6.53625 15.9991L6.95327 15.9991L20.8131 15.9991L20.8131 4.00166L3 4.00166L3 19.5694L6.24279 16.2954Z"
      fill="#2FBDEA"
      fillOpacity="0.5"
      stroke="#2FBDEA"
      strokeWidth="2"
    />
  </SvgIcon>
);
