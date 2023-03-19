import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import Icon from 'modules/common/icons/google-icon.svg';

export const GoogleIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon component={Icon} viewBox="0 0 15 20" {...props} />
);
