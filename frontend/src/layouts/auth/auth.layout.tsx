import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import { useAuthLayoutStyles } from 'layouts/auth/auth.styles';
import { Aside, Content, ContentInterface, Header } from 'layouts/auth/partials';
import Head from 'next/head';
import { FunctionComponent, ReactNode } from 'react';

export interface AuthLayoutInterface {
  title: string;
  back?: ReactNode;
  footer?: ReactNode;
  noAside?: boolean;
  aside?: ReactNode;
  children?: ReactNode;
  AsideProps?: GridProps;
  ContentProps?: ContentInterface;
  HeaderProps?: GridProps;
}

export const AuthLayout: FunctionComponent<AuthLayoutInterface> = (props) => {
  const { aside, noAside, back, title, children, AsideProps, ContentProps, HeaderProps } = props;
  const classes = useAuthLayoutStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box className={classes.root}>
        {!noAside && (
          <Grid container className={classes.grid}>
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              sm={12}
              md={8}
              lg={5}
              component="main"
              className={classes.main}
              pt={9}
            >
              <Box className={classes.formSide}>
                <Header {...HeaderProps}>{back}</Header>
                <Content {...ContentProps}>{children}</Content>
              </Box>
            </Grid>
            <Aside {...AsideProps}>{aside}</Aside>
          </Grid>
        )}

        {noAside && (
          <Grid container className={classes.grid}>
            <Grid item sm={12} md={3} lg={4} xl={4} className={classes.back} pt={9}>
              {back}
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              item
              sm={12}
              md={6}
              lg={4}
              xl={4}
              component="main"
              className={classes.noAsideMain}
              pt={9}
            >
              <Box className={classes.formSide}>
                <Header {...HeaderProps} />
                <Content {...ContentProps}>{children}</Content>
              </Box>
            </Grid>
            <Grid item sm={12} md={3} lg={4} xl={4} pt={9}>
              {/* spacer */}
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};
