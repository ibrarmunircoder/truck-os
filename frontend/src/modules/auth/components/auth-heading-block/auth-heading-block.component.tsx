import { useAuthHeadingBlockStyles } from 'modules/auth/components/auth-heading-block/auth-heading-block.styles';
import { FunctionComponent } from 'react';

export const AuthHeadingBlock: FunctionComponent = ({ children }) => {
  const classes = useAuthHeadingBlockStyles()
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
};
