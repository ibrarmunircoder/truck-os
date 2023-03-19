import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useMatchMediaQuery } from "layouts/dashboard/hooks";
import { useStepperStyles } from "modules/common/components/stepper/stepper.styles";
import { virtualIbnSelector } from "modules/invoice-creation/selectors";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

export interface StepperInterface {
    id: number,
    title?: string,
    stepTitle: string,
}

export interface StepperPartialInterface {
    steps: StepperInterface[],
    activeStep: number,
    showTitle?: boolean,
}

export const StepperComponent: FunctionComponent<StepperPartialInterface> = (props) => {
    const isDesktop = useMatchMediaQuery();
    const classes = useStepperStyles({ isDesktop });
    const { virtualIBN } = useSelector(virtualIbnSelector);
    const { steps, activeStep, showTitle } = props;

    return (
        <>
            {isDesktop || isDesktop && showTitle ? steps.map((step, index) => (activeStep === index ? activeStep === 2 && virtualIBN ? step.title && <Typography key={index} component={'h2'} className={classes.stepDeskTitle}>{step.title}</Typography>: step.title && <Typography key={index} component={'h2'} className={classes.stepDeskTitle}>{step.title}</Typography> : '')) : ''}
            <Stepper activeStep={activeStep} alternativeLabel className={classes.wizardSteps} connector={<Box className={classes.stepLine}></Box>}>
                {steps.map((step) => (
                    <Step key={step.id}>
                        <StepLabel
                            classes={{
                                labelContainer: classes.stepText,
                            }}
                            StepIconProps={{
                                classes: {
                                    root: classes.stepNumber,
                                    completed: classes.completeStepNumber,
                                    active: classes.activeStepNumber,
                                    error: classes.stepError,
                                    // disabled: classes.disabled
                                }
                            }}
                        >{step.stepTitle}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};
