import { Avatar, Box, GridProps, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import { AppDispatch } from 'configuration/redux/store';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { useNavigationStyles } from 'layouts/dashboard/partials/navigation/navigation.styles';
import { settingsAccountQueryAction } from 'modules/account-settings/actions';
import { useTranslation } from 'modules/common/hooks';
import AccountActiveIcon from 'modules/common/icons/navigation/account-active-icon.svg';
import AccountIcon from 'modules/common/icons/navigation/account-icon.svg';
import PaymentActiveIcon from 'modules/common/icons/navigation/payment-active-icon.svg';
import PaymentIcon from 'modules/common/icons/navigation/payment-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from 'routes';
import { useAccountBasicSettingsInfo, useAccountCompanyDetails } from 'views/account-settings/hooks';

export interface NavigationInterface extends GridProps {}

export const NavigationMenu: FunctionComponent<NavigationInterface> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDesktop = useMatchMediaQuery();
  const classes = useNavigationStyles({ isDesktop });
  const { user } = useAccountBasicSettingsInfo();
  useEffect(() => {
    if (user) {
      void dispatch(settingsAccountQueryAction(user.id));
    }
  }, [dispatch]);
  const { accountRecord } = useAccountCompanyDetails();
  const router = useRouter();
  const { t } = useTranslation();
  const naviationList = [
    {
      title: t('payment-dashboard.layout.payment'),
      path: [
        '/',
        `/${routes.paymentDashboard}`,
        `/${routes.invoiceCreation}`,
        `/${routes.confirmTransaction}/[id]`,
        `/${routes.paymentStatus}`,
        `/${routes.companyRegister}`,
        `/${routes.accountPending}`,
        `/${routes.invoiceDetails}/[id]`,
      ],
      mainPath: '/',
      icon: <PaymentIcon />,
      activeIcon: <PaymentActiveIcon />,
    },
    {
      title: t('payment-dashboard.layout.account'),
      path: [`/${routes.accountSettings}`],
      mainPath: `/${routes.accountSettings}`,
      icon: <AccountIcon />,
      activeIcon: <AccountActiveIcon />,
    },
  ];
  return (
    <nav className={classes.navigationBox}>
      <Box className={classes.userInfoBox}>
        <Link href={'/'}>
          <a className={classes.logoView}>
            <Image
              className={classes.logoImage}
              src={'/static/logos/truckos.svg'}
              width={142}
              objectFit={'cover'}
              height={25}
              alt="TruckOs Logo"
            />
          </a>
        </Link>
        <Box className={classes.userDetails}>
          <Avatar className={classes.userInfoAvatar} />
          <Typography className={classes.userName} component="h5">
            {user && `${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography className={classes.companyNameTitle} component="h5">
            {accountRecord && accountRecord.companyName}
          </Typography>
          <Typography className={classes.userEmail} component="h5">
            {user && `${user.email}`}
          </Typography>
        </Box>
      </Box>
      <MenuList disableListWrap={true} className={classes.navigation}>
        {naviationList.map((menu, index) => {
          const { path, title, icon, activeIcon, mainPath } = menu;
          return (
            <MenuItem key={index} selected={path.includes(router.pathname)} className={classes.menuitem}>
              <Link href={mainPath}>
                <a className={classes.menuItemLink}>
                  <ListItemIcon>{path.includes(router.pathname) ? activeIcon : icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </a>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </nav>
  );
};
