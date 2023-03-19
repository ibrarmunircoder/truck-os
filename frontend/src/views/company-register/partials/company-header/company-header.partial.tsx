import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { useCompanyHeaderStyles } from 'views/company-register/partials/company-header/company-header.styles';

interface ICompanyHeaderProps {
  title: string;
}

export const CompanyHeader: FunctionComponent<ICompanyHeaderProps> = ({ title }): React.ReactElement => {
  const classes = useCompanyHeaderStyles();
  return (
    <Typography component="h1" className={classes.companyHeader} gutterBottom>
      {title}
    </Typography>
  );
};
