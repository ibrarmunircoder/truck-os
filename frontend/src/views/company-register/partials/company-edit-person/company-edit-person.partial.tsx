import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useLanguages, useTranslation } from 'modules/common/hooks';
import DeleteIcon from 'modules/common/icons/delete-icon.svg';
import EditIcon from 'modules/common/icons/edit-pencil.svg';
import { DateFnsLocaleContext } from 'modules/date-time/contexts';
import React, { FunctionComponent, useContext } from 'react';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { AccountUserInterface } from 'views/company-register/interfaces';
import { useCompanyEditPersonStyles } from 'views/company-register/partials/company-edit-person/company-edit-person.styles';
interface CompanyPersonFieldPropsInterface {
  label: string;
  value: string;
}

interface CompanyEditPersonPropsInterface {
  accountUser: AccountUserInterface;
  accountUserType: string;
  type: AccountUserTypeEnum;
  handleEditClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDeleteClick: () => void;
}

const CompanyPersonField: FunctionComponent<CompanyPersonFieldPropsInterface> = ({ label, value }) => {
  const classes = useCompanyEditPersonStyles();
  return (
    <Box className={classes.cardPersonFieldWrapper}>
      <Typography className={classes.cardPersonFieldLabel} component="h3">
        {label}
      </Typography>
      <Typography className={classes.cardPersonFieldValue} component="h3">
        {value}
      </Typography>
    </Box>
  );
};

export const CompanyEditPerson: FunctionComponent<CompanyEditPersonPropsInterface> = ({
  accountUser,
  handleEditClick,
  handleDeleteClick,
  accountUserType,
  type,
}) => {
  const classes = useCompanyEditPersonStyles();
  const languages = useLanguages();
  const locale = useContext(DateFnsLocaleContext);
  const { t } = useTranslation();

  const languageElement =
    type === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE ? (
      <CompanyPersonField
        label={t('company-register.account-user.language')}
        value={languages.find((language) => language.code === accountUser.language)?.name ?? 'English'}
      />
    ) : null;
  return (
    <Card className={classes.card}>
      <Box className={classes.cardHeader}>
        <Typography component="h3" className={classes.cardHeaderLeft}>
          {accountUserType}
        </Typography>
        <Box className={classes.cardHeaderRight}>
          <div className={classes.cardHeaderIcons} onClick={handleDeleteClick}>
            <DeleteIcon />
          </div>
          <div className={classes.cardHeaderIcons} onClick={handleEditClick}>
            <EditIcon />
          </div>
        </Box>
      </Box>
      <CardContent className={classes.cardContent}>
        <CompanyPersonField label={t('company-register.account-user.first-name')} value={accountUser.firstName} />
        <CompanyPersonField label={t('company-register.account-user.last-name')} value={accountUser.lastName} />
        <CompanyPersonField label={t('company-register.account-user.email')} value={accountUser.email} />
        <CompanyPersonField
          label={t('company-register.account-user.birthday1')}
          value={format(new Date(accountUser.birthday), 'P', { locale })}
        />
        {languageElement}
      </CardContent>
    </Card>
  );
};
