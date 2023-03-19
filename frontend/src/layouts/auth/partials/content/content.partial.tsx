import Grid, { GridProps } from '@mui/material/Grid';
import { useContentStyles } from 'layouts/auth/partials/content/content.styles';
import { FunctionComponent } from 'react';

export interface ContentInterface extends GridProps {
  stretched: boolean,
}

export const Content: FunctionComponent<ContentInterface> = ({ children, ...other }) => {
  const classes = useContentStyles(other);

  return (
    <Grid item component="section" className={classes.root} {...other}>
      {children}
      {/*<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>*/}
    </Grid>
  );
};
