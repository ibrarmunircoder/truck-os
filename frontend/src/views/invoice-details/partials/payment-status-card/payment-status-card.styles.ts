import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const usePaymentStatusCardStyles = makeStyles(() => ({
  infoIcon: {
    fontSize: '15px',
    color: colors.darkGray,
    position: 'relative',
    top: '3px',
  },
  paymentStatusCard: {
    background: colors.white,
    border: '1px solid #E7E7E7',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  paymentStatusCardTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    color: colors.black,
  },
  tooltip: {
    lineHeight: '20px',
    marginLeft: '20px',
    borderRadius: '8px',
    color: colors.black,
    padding: '10px',
    fontWeight: 600,
    fontSize: '12px',
    backgroundColor: colors.lightPrimary,
  },
  greenBgGradient: {
    background: 'linear-gradient(120.94deg, #99D798 -10.74%, #65A664 107.42%) !important',
  },
  greyBgGradient: {
    background: 'linear-gradient(120.94deg, #D1D1D1 -10.74%, #585858 107.42%) !important',
  },
  iconSquare: {
    width: '40px',
    height: '40px',
    display: 'flex',
    background: colors.white,
    alignItems: 'center',
    borderRadius: '8px',
    justifyContent: 'center',
  },
}));
