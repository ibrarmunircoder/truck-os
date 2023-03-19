import { Grid, Typography } from '@mui/material';
import { usePageHeaderStyles } from 'modules/common/components/page-header/page-header.styles';
import React, { FunctionComponent } from 'react';

interface PageHeaderProps {
    title: string,
    isDesktop: boolean,
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({
    title,
    isDesktop,
}) => {
    const classes = usePageHeaderStyles({ isDesktop });
    return (
        <Grid container>
            <Grid item xs={12} component="header" className={classes.header}>
                <Typography component={'h3'} className={classes.mainTitle}>{title}</Typography>
            </Grid>
        </Grid>
    );
};
