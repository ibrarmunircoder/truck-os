import LinearProgress from '@mui/material/LinearProgress';
import { FunctionComponent } from 'react';

export interface LoaderInterface {}

export const Loader: FunctionComponent<LoaderInterface> = () => <LinearProgress />;
