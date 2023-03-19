import { Typography } from '@mui/material';
import { useEmptyPageStyles } from 'modules/example/components/empty-page/empty-page.styles';
import React from 'react';

interface IProps {
  title: string;
}

export const EmptyPage: React.FC<IProps> = ({ title }) => {
  const classes = useEmptyPageStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h3">Don’t see any {title.toLocaleLowerCase()}?</Typography>
      <Typography variant="subtitle1">Start adding one from top right</Typography>
    </div>
  );
};
