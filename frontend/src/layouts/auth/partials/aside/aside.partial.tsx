import Grid, { GridProps } from '@mui/material/Grid';
import { useAsideStyles } from 'layouts/auth/partials/aside/aside.styles';
import { FunctionComponent, ReactNode } from 'react';

export interface AsideInterface extends GridProps {
  children?: ReactNode;
}

export const Aside: FunctionComponent<AsideInterface> = (props) => {
  const classes = useAsideStyles();

  return (
    <Grid container item md={4} lg={7} component="aside" direction="row" className={classes.root} spacing={0}>
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        xs={12}
        component="section"
        className={classes.content}
      >
        {props.children}
      </Grid>

      <Grid
        container
        item
        component="section"
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
      </Grid>
    </Grid>
  );
};
