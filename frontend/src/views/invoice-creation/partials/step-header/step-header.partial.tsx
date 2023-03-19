import { ChevronLeft, Close } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { StepperInterface } from 'modules/common/components/stepper';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';
import { useStepHeaderStyles } from 'views/invoice-creation/partials/step-header/step-header.styles';

export interface StepHeaderPartialInterface {
  steps: StepperInterface[];
  activeStep: number;
  handleBack: () => void;
  handleExit?: () => void;
}

export const StepHeaderPartial: FunctionComponent<StepHeaderPartialInterface> = (props) => {
  const isDesktop = useMatchMediaQuery();
  const classes = useStepHeaderStyles({ isDesktop });
  const { handleBack, steps, activeStep, handleExit } = props;
  const { t } = useTranslation();

  return (
    <Box component={'div'} className={classes.pageTitleBox}>
      <button className={classes.backButton} onClick={handleBack}>
        <ChevronLeft />
      </button>
      <Box component={'div'} className={classes.wizardTitleDetail}>
        <Typography component={'h3'} className={classes.wizardTitle}>
          {t('invoice-creation.title')}
        </Typography>
        <Typography className={classes.subtitle}>
          {steps.filter((step) => step.id === activeStep).map((step) => step.title)}
        </Typography>
      </Box>
      <button className={classes.exitButton} onClick={handleExit}>
        <Close />
      </button>
    </Box>
  );
};
