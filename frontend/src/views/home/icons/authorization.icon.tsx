import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

export const AuthorizationIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon
    sx={{
      color: 'transparent',
    }}
    {...props}
  >
    <path
      d="M16.333 17.336a4.666 4.666 0 1 0-9.333 0 4.666 4.666 0 0 0 9.333 0Z"
      fill="#2FBDEA"
      fillOpacity={0.5}
      stroke="#2FBDEA"
      strokeWidth={2}
    />
    <path
      d="M11.668 12.502V2h3.889M11.668 6.002H13.5"
      stroke="#2FBDEA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);
