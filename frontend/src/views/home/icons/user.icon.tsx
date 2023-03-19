import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

export const UserIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon {...props}>
    <path
      d="M12 9C14.2091 9 16 7.20914 16 5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5C8 7.20914 9.79086 9 12 9Z"
      fill="#2FBDEA"
      fillOpacity="0.5"
      stroke="#2FBDEA"
      strokeWidth="2"
    />
    <path
      d="M12 13C9.61305 13 7.32387 13.9014 5.63604 15.5059C3.94821 17.1103 3 19.2865 3 21.5556V23H21V21.5556C20.9995 19.2866 20.0512 17.1107 18.3635 15.5063C16.6757 13.902 14.3868 13.0004 12 13Z"
      fill="#2FBDEA"
      fillOpacity="0.5"
      stroke="#2FBDEA"
      strokeWidth="2"
    />
  </SvgIcon>
);
