import Container from '@mui/material/Container';
import { useMainLayoutStyles } from 'layouts/main/main.styles';
import { Footer } from 'layouts/main/partials/footer';
import { Header } from 'layouts/main/partials/header';
import { Navigation } from 'layouts/main/partials/navigation';
import { useSidebar } from 'modules/layout/hooks';
import { NotificationsSidebar } from 'modules/notifications/components/notifications-sidebar';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

export interface MainLayoutInterface {
  noFooter?: boolean;
  title?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}

export const MainLayout = ({ title, breadcrumbs, children, noFooter }: MainLayoutInterface): ReactElement => {
  const classes = useMainLayoutStyles();

  const { open: handleDrawerOpen, close: handleDrawerClose, isOpen: drawerOpen } = useSidebar();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <Header open={drawerOpen} handleDrawerOpen={handleDrawerOpen} title={title} />
        <Navigation open={drawerOpen} handleDrawerClose={handleDrawerClose} />
        <NotificationsSidebar />
        <main className={classes.content} id="main-layout">
          <div className={classes.appBarSpacer} />
          <Container className={classes.container} maxWidth={false}>
            {breadcrumbs && <div className={classes.breadcrumbsContainer}>{breadcrumbs}</div>}
            {children}
          </Container>
          {!noFooter && <Footer />}
        </main>
      </div>
    </>
  );
};
