/* eslint-disable @roq/filename-suffix-mismatch */

import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useNotificationsListItemStyles = roqMakeStyles((theme: Theme) => ({
  'card--root': {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    border: theme.palette.mode === ThemeEnum.LIGHT ? '2px solid #F8FAFC' : 'none',
    boxSizing: 'border-box',
    boxShadow: theme.palette.mode === ThemeEnum.LIGHT ? '0px 4px 4px rgba(238, 241, 244, 0.25)' : 'none',
    cursor: 'pointer',
  },
  'cardHeader--root': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  'cardHeader--avatar': {
    marginRight: theme.spacing(1),
  },
  'cardHeader--content': {
    flexGrow: 1,
    overflow: 'hidden',
  },
  'title--root': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: theme.palette.mode === ThemeEnum.LIGHT ? '#0F172A' : '#FFFFFF',
    marginLeft: theme.spacing(2),
  },
  titleDiv: {
    display: 'flex',
  },
  'subheader--root': {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.15px',
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
  'cardHeader--action': {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    marginLeft: theme.spacing(1),
  },
  'cardContent--root': {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
    margin: theme.spacing(2, 0, 0, 0),
  },
  'content--root': {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: theme.palette.mode === ThemeEnum.LIGHT ? '#0F172A' : '#FFFFFF',
  },
  'moreButton--root': {
    margin: theme.spacing(-1.5),
    marginLeft: theme.spacing(0.5),
  },
  'unreadBadge--root': {
    width: '100%',
  },
  'unreadBadge--dot': {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: theme.spacing(1.5),
    bottom: theme.spacing(1.5),
    right: theme.spacing(1),
  },
}));
