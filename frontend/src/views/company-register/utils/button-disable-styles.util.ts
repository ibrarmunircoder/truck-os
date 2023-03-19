/* eslint-disable @typescript-eslint/no-explicit-any */
import { colors } from 'modules/common/utils/colors';

export const buttonBaseStyles = {
  borderRadius: '10px',
  height: 'auto',
  display: 'block',
};

export const disabledButtonStyles = {
  ...buttonBaseStyles,
  backgroundColor: `${colors.mediumDarkGray} !important`,
};

export const getButtonWidth = (activeStep: number): { [key: string]: any } => {
  let width = {};
  switch (activeStep) {
    case 0:
      width = { md: '45rem', lg: '48rem' };
      break;
    case 1:
      width = { md: '30rem' };
      break;
    default:
      width = {};
      break;
  }

  return width;
};
