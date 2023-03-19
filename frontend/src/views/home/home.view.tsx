/* eslint-disable @roq/view-correct-location-and-name, @roq/imports-should-follow-conventions */
/* name conflicting with other rule, 
(Error message is also not correct 
[error  Views should only have a single export and that should be the function component]) */

import { Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';
import { ReactElement } from 'react';
import * as React from 'react';
import {
  AuthorizationIcon,
  ChatIcon,
  FileIcon,
  LocalizationIcon,
  MailIcon,
  NotificationIcon,
  UserIcon,
  UserInterfaceIcon,
} from 'views/home/icons';
import { HomeFeatureAccordionPartial } from 'views/home/partials';


export const useHomeViewStyles = roqMakeStyles((theme: Theme) => ({
  greetingMessage: {
    marginBottom: theme.spacing(4),
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.mode === 'light' ? theme.palette.text.secondary : theme.palette.common.white,
  },
  pageTitle: {
    fontSize: theme.typography.pxToRem(24),
    marginBottom: theme.spacing(2),
  },
}));

export const breadcrumbs = [{ label: 'home', href: '/', translate: true }];

export const HomeView = withAuth()((): ReactElement => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const theme = useTheme();
  const classes = useHomeViewStyles();
  const features = [
    {
      title: t('user-authorization.title'),
      icon: <AuthorizationIcon />,
      summary: t('user-authorization.summary'),
      subFeatures: [
        { text: t('user-authorization.sub-feature_one.description') },
        { text: t('user-authorization.sub-feature_two.description') },
        { text: t('user-authorization.sub-feature_three.description') },
      ],
    },
    {
      title: t(`user-management.title`),
      icon: <UserIcon />,
      summary: t('user-management.summary'),
      subFeatures: [
        {
          text: t('user-management.sub-feature_one.description'),
          cta: {
            link: '/users',
          },
        },
        { text: t('user-management.sub-feature_two.description') },
        { text: t('user-management.sub-feature_three.description'), cta: { link: `/profile/${user.id}` } },
        { text: t('user-management.sub-feature_four.description'), cta: { link: '/settings' } },
      ],
    },
    {
      title: t('localization.title'),
      icon: <LocalizationIcon />,
      summary: t('localization.summary'),
      subFeatures: [
        {
          text: t('localization.sub-feature_one.description'),
          cta: {
            link: '/settings',
          },
        },
        {
          text: t('localization.sub-feature_two.description'),
        },
      ],
    },
    {
      title: t(`notifications.title`),
      icon: <NotificationIcon />,
      summary: t('notifications.summary'),
      subFeatures: [
        {
          text: t('notifications.sub-feature_one.description'),
        },
        {
          text: t('notifications.sub-feature_two.description'),
        },
        {
          text: t('notifications.sub-feature_three.description'),
        },
      ],
    },
    {
      title: t('file-management.title'),
      icon: <FileIcon />,
      summary: t('file-management.summary'),
      subFeatures: [
        {
          text: t('file-management.sub-feature_one.description'),
          cta: {
            link: '/files',
          },
        },
        {
          text: t('file-management.sub-feature_two.description'),
        },
        {
          featuredImage: '/static/logos/google-cloud-storage.png',
          text: t('file-management.sub-feature_three.description'),
        },
      ],
    },
    {
      title: t('chat.title'),
      icon: <ChatIcon />,
      summary: t('chat.summary'),
      subFeatures: [
        { text: t('chat.sub-feature_one.description') },
        { text: t('chat.sub-feature_two.description') },
        { text: t('chat.sub-feature_three.description') },
        { text: t('chat.sub-feature_four.description'), cta: { link: '/message-center' } },
      ],
    },
    {
      title: t('mail.title'),
      icon: <MailIcon />,
      summary: t('mail.summary'),
      subFeatures: [
        {
          text: t('mail.sub-feature_one.description'),
        },
        {
          featuredImage: theme.palette.mode === ThemeEnum.LIGHT ? '/static/logos/sendgrid-light.png' : '/static/logos/sendgrid-dark.png',
          text: t('mail.sub-feature_two.description'),
          cta: {
            link: 'https://sendgrid.com/',
            target: '_blank',
          },
        },
      ],
    },
    {
      title: t('user-interface.title'),
      icon: <UserInterfaceIcon />,
      summary: t('user-interface.summary'),
      subFeatures: [
        {
          text: t('user-interface.sub-feature_one.description'),
        },
        {
          featuredImage: '/static/logos/material-ui.png',
          text: t('user-interface.sub-feature_two.description'),
          cta: { link: 'https://mui.com/', target: '_blank' },
        },
      ],
    },
  ];

  return (
    <MainLayout title={t('title_home')}>
      <Typography variant="h2" className={classes.pageTitle}>
        Dashboard
      </Typography>
      <Typography variant="body2" className={classes.greetingMessage}>
        {t('dashboard.welcome-user-text', { fullName: `${user.firstName} ${user.lastName}` })}
      </Typography>

      <HomeFeatureAccordionPartial features={features} />
    </MainLayout>
  );
});
