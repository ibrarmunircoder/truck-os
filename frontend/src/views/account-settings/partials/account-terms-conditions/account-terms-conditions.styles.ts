import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useAccountTermsConditionsStyles = makeStyles<Theme, Props>(() => ({
  accountTermsConditionsPageTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '22px',
    color: colors.black,
    display: 'flex',
    flexDirection: (props) => (props.isDesktop ? 'row' : 'column'),
    backgroundColor: (props) => (props.isDesktop ? '#fafafa' : 'transparent'),
    padding: (props) => (props.isDesktop ? '20px' : '0px 20px'),
    borderRadius: (props) => (props.isDesktop ? '10px' : '0'),
    marginBottom: (props) => (props.isDesktop ? '40px' : '0'),
  },
  accountTermsConditionsBackIcon: {
    color: colors.black,
    cursor: 'pointer',
    position: 'relative',
    top: '-2px',
    height: (props) => (props.isDesktop ? '22px' : 'auto'),
    marginRight: (props) => (props.isDesktop ? '15px' : '0px'),
    marginBottom: (props) => (props.isDesktop ? '0px' : '10px'),
  },
  accountTermsConditionsPageSubtitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.darkGray,
    margin: '10px 0px',
    padding: '0px 20px',
  },
  accountTermsConditionsPageSubtitle2: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '22px',
    color: colors.darkGray,
    padding: '0px 20px',
    margin: '47px 0px',
  },
  accountTermsConditionAccordian: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    border: (props) => (props.isDesktop ? `1px solid ${colors.lightGray}` : 'none'),
    borderTop: `1px solid ${colors.lightGray} !important`,
    marginBottom: (props) => (props.isDesktop ? '10px' : '0'),
    borderRadius: (props) => (props.isDesktop ? '10px' : '0'),
    padding: '15px 16px',
    cursor: 'pointer',
  },
  accountTermsConditionAccordianLast: {
    borderBottom: `1px solid ${colors.lightGray} !important`,
  },
  accountTermsConditionAccordianIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTermsConditionAccordianTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: colors.darkGray,
  },
}));
