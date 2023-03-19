import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FunctionComponent, HTMLAttributes } from 'react';

export interface ChatHeadingInterface extends HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes?: any,
  titleClassName?: string,
  title?: string,
  mobileTitle?: string,
  backButton?: boolean;
  onBackClick?: () => void;
}

export const HeadingPartial: FunctionComponent<ChatHeadingInterface> = ({
  classes = {},
  title,
  children
}) => (
    <Grid container className={classes.root} direction="row" justifyContent="space-between" alignItems="center">
      <Grid item className={classes.titleWrapper}>
        {/*backButton && <ButtonIcon color="primary" size={'small'} onClick={onBackClick}>
          <ChevronLeftOutline size={20} />
        </ButtonIcon>*/}
        <Typography variant="h5" className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item>
        {children}
      </Grid>
    </Grid>
  )
