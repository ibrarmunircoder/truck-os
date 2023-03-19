import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';

interface FormErrorInterface {
  message: string;
}

export const FormErrorPartial: FunctionComponent<FormErrorInterface> = ({ message }) => (
  <Typography variant="subtitle1" color="error" align="center">
    {message}
  </Typography>
);
