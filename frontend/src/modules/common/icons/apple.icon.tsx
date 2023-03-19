import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import AppleDarkIcon from 'modules/common/icons/apple-dark-icon.svg';
import AppleLightIcon from 'modules/common/icons/apple-light-icon.svg';

export const AppleIcon = (props: SvgIconProps): React.ReactElement => {
  const theme = useTheme();

  const Icon = theme.palette.mode === 'light' ? AppleDarkIcon : AppleLightIcon;

  return <SvgIcon component={Icon} viewBox="0 0 15 20" {...props} />;
};
