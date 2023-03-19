import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import clsx from 'clsx';
import { useBreadcrumbsStyles } from 'modules/breadcrumbs/components/breadcrumbs/breadcrumbs.styles';
import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { ReactElement } from 'react';

export interface BreadcrumbsInterface {
  items: BreadcrumbsItemInterface[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsInterface): ReactElement => {
  const classes = useBreadcrumbsStyles();
  const { t } = useTranslation();

  return (items?.length || 0) > 1 ? (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {items.map((item, idx) => (
        <RoqLink
          className={clsx(classes.item, idx === items.length - 1 && classes.lastItem)}
          color={idx === items.length - 1 ? 'primary' : 'inherit'}
          href={item.href}
          key={idx}
        >
          {/*
          t('title_home')
          t('title_message-center')
          t('title_profile')
          t('title_files')
          t('title_settings')
          t('title_users')
           */}
          {item.translate ? t('title', { context: item.label }) : item.label}
        </RoqLink>
      ))}
    </MuiBreadcrumbs>
  ) : null;
};
