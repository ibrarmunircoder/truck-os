import { Grid, Skeleton, Typography } from '@mui/material';
import { useLoadingSkeletonStyles } from 'modules/common/components/loading-skeleton/loading-skeleton.styles';
import React, { ReactElement } from 'react';

export const LoadingSkeleton = (): ReactElement => {
  const classes = useLoadingSkeletonStyles();

  const renderSkeletonSet = (count) => {
    const skeletons = [];

    for (let index = 0; index < count; index++) {
      skeletons.push(
        <React.Fragment key={index}>
          <Typography variant="h2">
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="caption">
            <Skeleton animation="wave" />
          </Typography>
        </React.Fragment>,
      );
    }

    return skeletons;
  };

  return (
    <Grid container direction="column" className={classes.container}>
      <Typography variant="h1">
        <Skeleton animation="wave" />
      </Typography>

      {renderSkeletonSet(5)}
    </Grid>
  );
};
