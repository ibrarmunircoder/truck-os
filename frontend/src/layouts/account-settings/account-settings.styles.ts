import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  showMenus: boolean;
  isDesktop: boolean;
};

export const useAccountSettingsStyles = makeStyles<Theme, Props>(() => ({
  root: {
    padding: (props) => (props.isDesktop ? '40px 50px 30px 50px' : `40px 0px ${props.showMenus ? '100px' : '0px'} 0px`),
    position: 'relative',
    display: 'inline-block',
    width: (props) => props.isDesktop ? 'calc(100% - 260px)' : '100%',
    marginLeft: (props) => props.isDesktop ? '260px' : '0',
    minHeight: (props) => props.isDesktop ? 'auto' : props.showMenus ? 'calc(100vh - 95px)' : 'calc(100vh - 80px)',
    borderRadius: (props) => props.isDesktop ? '0' : '25px 25px 0px 0px',
    paddingTop: '40px',
  },
}));
