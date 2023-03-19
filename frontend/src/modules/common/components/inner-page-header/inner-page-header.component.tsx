import { ChevronLeft, Close } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useInnerPageHeaderStyles } from 'modules/common/components/inner-page-header/inner-page-header.styles';
import React, { FunctionComponent } from 'react';

interface InnerPageHeaderProps {
  title: string;
  subtitle: string;
  handleBack: () => void;
  handleExit?: () => void;
  showExit: boolean;
  showBackButton: boolean;
  isDesktop?: boolean;
}

export const InnerPageHeader: FunctionComponent<InnerPageHeaderProps> = ({
  title,
  subtitle,
  handleBack,
  handleExit,
  showExit,
  showBackButton,
  isDesktop,
}) => {
  const classes = useInnerPageHeaderStyles({ isDesktop });
  return (
    <>
      <Box component={'div'} className={classes.pageTitleBox}>
        {showBackButton ? (
          <button className={classes.backButton} onClick={handleBack}>
            <ChevronLeft />
          </button>
        ) : null}
        <Box component={'div'} className={classes.pageTitleDetail}>
          <Typography component={'h3'} className={classes.pageTitle}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </Box>
        {showExit ? (
          <button className={classes.exitButton} onClick={handleExit}>
            <Close />
          </button>
        ) : null}
      </Box>
      {isDesktop ? (
        <Box className={classes.headerTitle}>
          <Typography component={'h2'} className={classes.stepDeskTitle}>
            {subtitle}
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
