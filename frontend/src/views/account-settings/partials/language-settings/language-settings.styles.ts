import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useLanguageSettingsStyles = makeStyles<Theme, Props>(() => ({
  accountCompanyDetailsPageTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '22px',
    color: colors.black,
    display: 'flex',
    flexDirection: (props) => props.isDesktop ? 'row' : 'column',
    backgroundColor: (props) => props.isDesktop ? '#fafafa' : 'transparent',
    padding: (props) => props.isDesktop ? '20px' : '0px 20px',
    borderRadius: (props) => props.isDesktop ? '10px' : '0',
    marginBottom: (props) => props.isDesktop ? '40px' : '0',
  },
  accountCompanyDetailsPageSubtitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.darkGray,
    margin: '10px 0px',
    padding: '0px 20px',
  },
  accountCompanyDetailsBackIcon: {
    color: colors.black,
    cursor: 'pointer',
    position: 'relative',
    top: '-2px',
    height: (props) => props.isDesktop ? '22px' : 'auto',
    marginRight: (props) => props.isDesktop ? '15px' : '0px',
    marginBottom: (props) => props.isDesktop ? '0px' : '10px',
  },
  dropdownTitle:{
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.darkGray,
    margin: '10px 0px',
  },
  languageSelect: {
    color: colors.black,
    maxWidth: (props) => props.isDesktop ? '390px' : '100%',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#64748B',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary
    },
    '& .MuiSelect-icon': {
      color: colors.lightGray3,
    }
  },
  paperBackground: {
    backgroundColor: colors.white,
    color: colors.lightGray3,
    '& .MuiAutocomplete-option.Mui-focused': {
      backgroundColor: 'rgba(15, 23, 42, 0.04)',
    },
    '& .MuiAutocomplete-noOptions': {
      color: 'rgba(15, 23, 42, 0.54)',
    },
    '& .MuiMenuItem-root': {
      color: colors.lightGray3,
      '&.Mui-selected':{
        backgroundColor : colors.lightPrimary
      }
    }
  }
}));
