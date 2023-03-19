import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import Icon from 'modules/common/icons/linkedin-icon.svg';

export const LinkedInIcon = (props: SvgIconProps): React.ReactElement => (
  <SvgIcon component={Icon} viewBox="0 0 15 20" {...props} />
);
