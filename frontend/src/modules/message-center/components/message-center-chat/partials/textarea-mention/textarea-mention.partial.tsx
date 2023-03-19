import { SubMentionComponentProps } from '@draft-js-plugins/mention/lib/Mention';
import clsx from 'clsx';
import { FunctionComponent } from 'react';

export interface TextareaMentionInterface extends SubMentionComponentProps {
  
}

export const TextareaMentionPartial: FunctionComponent<TextareaMentionInterface> = ({
  children, 
  mention, // eslint-disable-line @typescript-eslint/no-unused-vars
  className, // eslint-disable-line @typescript-eslint/no-unused-vars
  entityKey, // eslint-disable-line @typescript-eslint/no-unused-vars
  theme, // eslint-disable-line @typescript-eslint/no-unused-vars 
  decoratedText, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...rest
}) => {
  const classes = {
    wrapper: clsx('underline cursor-pointer text-primary cursor-pointer') 
  }

  return (
    <span className={classes.wrapper} {...rest}>{children}</span>
  );
};
