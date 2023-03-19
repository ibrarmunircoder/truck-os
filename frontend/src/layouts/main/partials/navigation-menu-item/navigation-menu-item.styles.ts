import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { pictonBlue } from 'configuration/theme/colors';

export const useNavigationMenuItemStyles = makeStyles((theme: Theme) => ({
  listItemCollapsed: {
    color: theme.palette.grey[400],
    '&.Mui-selected': {
      backgroundColor: pictonBlue[300],
      '& svg': {
        fill: theme.palette.common.white,
      },
    },
    '&': {
      borderRadius: '52px',
    },
    width: '40px',
    height: '40px',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  listItemExpanded: {
    color: theme.palette.grey[400],
    borderRadius: '8px',
    '&.Mui-selected': {
      backgroundColor: pictonBlue[300],
      '& svg': {
        fill: theme.palette.common.white,
      },
    },
    height: '40px',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  listItemIconExpanded: {
    minWidth: 0,
    marginRight: theme.spacing(1),
    justifyContent: 'center',
  },
  listItemIconCollapsed: {
    minWidth: 0,
    justifyContent: 'center',
    marginRight: 'auto',
  },
  listItemPrimaryText: {
    ...theme.typography.body2,
    fontWeight: 500,
  },
  listItemPrimaryTextSelected: {
    ...theme.typography.body2,
    color: theme.palette.common.white,
    fontWeight: 500,
  },
}));
