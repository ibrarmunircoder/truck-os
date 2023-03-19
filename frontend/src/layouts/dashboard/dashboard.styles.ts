import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

type Props = {
  showMenus: boolean;
  isDesktop: boolean;
};

export const useDashboardLayoutStyles = makeStyles<Theme, Props>(() => ({
  root: {
    lineHeight: 'initial',
    backgroundColor: (props) => (props.isDesktop ? colors.white : colors.primary),
  },
  pageContent: {
    paddingBottom: (props) => (props.isDesktop ? '0px' : props.showMenus ? '100px' : '0'),
    position: 'relative',
    display: (props) => (props.isDesktop ? 'block' : 'inline-block'),
    width: (props) => (props.isDesktop ? 'calc(100% - 260px)' : '100%'),
    marginLeft: (props) => (props.isDesktop ? '260px' : '0'),
    minHeight: (props) => (props.isDesktop ? 'auto' : props.showMenus ? 'calc(100vh - 100px)' : 'calc(100vh - 80px)'),
    backgroundColor: colors.white,
    borderRadius: (props) => (props.isDesktop ? '0' : '25px 25px 0px 0px'),
  },
}));
