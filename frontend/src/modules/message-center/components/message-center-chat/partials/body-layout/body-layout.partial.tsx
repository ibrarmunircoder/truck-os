import Paper from '@mui/material/Paper';
import { useBodyLayoutStyles } from 'modules/message-center/components/message-center-chat/partials/body-layout/body-layout.styles';
import { FunctionComponent, ReactNode } from 'react';

export type BodyLayoutProps = {
  aside?: ReactNode,
}

export const BodyLayoutPartial: FunctionComponent<BodyLayoutProps> = ({ aside, children }) => {
  const classes = useBodyLayoutStyles();
  return (
    <div className={classes.root}>
      {
        aside && (
          <div className={classes.aside}>
            {aside}
          </div>
        )
      }
      <div className={classes.main}>
        <Paper classes={classes.mainPaper} elevation={8}>
          {children}
        </Paper>
      </div>
    </div>
  )
}

