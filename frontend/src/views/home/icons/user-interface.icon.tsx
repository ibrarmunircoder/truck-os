import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

export const UserInterfaceIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon
    {...props}
  >
    <path
      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM15 18H4V14H15V18ZM15 13H4V9H15V13ZM20 18H16V9H20V18Z"
      fill="#2FBDEA"
    />
    <rect x="4" y="9" width="11" height="4" fill="#2FBDEA" fillOpacity="0.5" />
    <rect x="4" y="14" width="11" height="4" fill="#2FBDEA" fillOpacity="0.5" />
    <rect x="16" y="9" width="4" height="9" fill="#2FBDEA" fillOpacity="0.5" />
  </SvgIcon>
);
