import { Theme } from '@mui/material';
import { yankeesBlue } from 'configuration/theme/colors';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useHomeFeatureAccordionStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    '&:not(:last-child)': {
      borderRadius: '8px',
    },
    '&:last-of-type': {
      borderRadius: '8px',
    },
    backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.white : '#1e293b',
    marginTop: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    filter: 'drop-shadow(0px 1px 1px rgba(31, 43, 72, 0.025)) drop-shadow(0px 1px 3px rgba(31, 43, 72, 0.05))',
    boxShadow: '0px 2px 1px -1px rgba(31, 43, 72, 0.05)',
    '&:before': {
      display: 'none',
    },
  },
  accordionDetails: {
    borderTop: theme.palette.mode === ThemeEnum.LIGHT ? '1px solid #eeeeee' : '1px solid #3e495a',
  },
  accordionSummary: {
    '&.Mui-expanded': {
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : theme.palette.common.white,
      '& .MuiTypography-body1': {
        color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : theme.palette.common.white,
      },
    },
    '&': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? `rgba(31, 43, 72, 0.5)` : `rgba(255, 255, 255, 0.5)`,
    },
    borderRadius: '8px',
    '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : theme.palette.common.white,
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1.5),
    },
  },
  featureIcon: {
    paddingTop: theme.spacing(0.5),
  },
  featureImage: {
    maxWidth: '110px',
    maxHeight: '24px',
  },
  featureSummary: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
  },
  featureTitle: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '160%',
    color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : theme.palette.common.white,
  },
  avatarContainer: {
    '&': {
      height: '20px',
      minWidth: '20px',
      marginRight: theme.spacing(2),
    },
  },
  avatar: {
    backgroundColor: '#94a3b8',
    color: theme.palette.common.white,
    fontWeight: 400,
    fontSize: '12px',
    height: '20px',
    width: '20px',
    lineHeight: '166%',
    letterSpacing: '0.4px',
  },
  divider: {
    color: '#5b6a81',
    borderStyle: 'dashed solid',
  },
  subFeatureDetailsText: {
    marginRight: theme.spacing(1),
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(15, 23, 42, 0.87)' : theme.palette.common.white,
  },
  ctaButton: {
    backgroundColor: '#2FBDEA',
    color: theme.palette.common.white,
  },

}));
