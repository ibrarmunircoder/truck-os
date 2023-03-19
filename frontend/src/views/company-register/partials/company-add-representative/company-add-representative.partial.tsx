import { InfoOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AppDispatch } from 'configuration/redux/store';
import { useFormikContext } from 'formik';
import { Button } from 'modules/common/components/button';
import { useTranslation } from 'modules/common/hooks';
import {
  addNewAccountUserOnClickAction,
  updateAccountUserDeleteAction,
  updateSubmitButtonDisabledStateAction,
} from 'modules/company-register/company-register.slice';
import { FormAlert } from 'modules/forms/components';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { useAddAccountUser } from 'views/company-register/hooks/use-add-account-user.hook';
import { AccountUserInterface } from 'views/company-register/interfaces';
import { CompanyEditPerson, DeleteModalPartial } from 'views/company-register/partials';
import { CompanyAddPerson } from 'views/company-register/partials/company-add-person/company-add-person.partial';
import { useCompanyAddRepresentativeStyles } from 'views/company-register/partials/company-add-representative/company-add-representative.styles';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { companyLegalRepresentativeFormModel, ICompanyAddRepresentativeFormModel } from 'views/company-register/utils';

interface ICompanyAddRepresentativeProps {
  formModel: ICompanyAddRepresentativeFormModel;
}

const PlusIcon = () => <img src="/static/icons/plus-icon-v2.svg" alt="Add Button" />;
const { representativePower } = companyLegalRepresentativeFormModel.formField;
export const CompanyAddRepresentative: FunctionComponent<ICompanyAddRepresentativeProps> = ({
  formModel,
}): React.ReactElement => {
  const { representatives: representativesField } = formModel.formField;
  const classes = useCompanyAddRepresentativeStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { values, setFieldValue, getFieldProps, handleBlur, touched, errors } = useFormikContext();
  const { t } = useTranslation();

  const {
    handleAddNewAccountUser,
    handleUpdateAccountUser,
    accountUserIndex,
    handleEditIconClick,
    handleDeleteIconClick,
    handleResetError,
    error,
    openToolTip,
    handleTooltipClose,
    handleTooltipOpen,
  } = useAddAccountUser();
  const representatives = values[representativesField.name];

  const solePower = values[representativePower.name];

  const [isOpenModal, setIsOpenModal] = useState(null);

  const numberOfRepresentatives = useMemo(
    () =>
      representatives.reduce((total: number, representative: AccountUserInterface) => {
        total = representative.id ? ++total : total;
        return total;
      }, 0),
    [representatives],
  );
  const numberOfLocalRepresentatives = useMemo(
    () =>
      representatives.reduce((total: number, representative: AccountUserInterface) => {
        total = representative.id ? total : ++total;
        return total;
      }, 0),
    [representatives],
  );

  useEffect(() => () => void dispatch(updateSubmitButtonDisabledStateAction(false)), []);

  useEffect(() => {
    if (solePower && numberOfRepresentatives === 0) {
      void dispatch(updateSubmitButtonDisabledStateAction(true));
    }
    if (solePower && numberOfRepresentatives === 1) {
      void dispatch(updateSubmitButtonDisabledStateAction(false));
    }
  }, [solePower, numberOfRepresentatives]);

  useEffect(() => {
    // if (!solePower && numberOfRepresentatives > 0 && numberOfRepresentatives < 2) {
    //   void dispatch(updateSubmitButtonDisabledStateAction(true));
    // }
    // if (!solePower && numberOfRepresentatives >= 2) {
    //   void dispatch(updateSubmitButtonDisabledStateAction(false));
    // }
    if (!solePower && numberOfLocalRepresentatives > 0) {
      void dispatch(updateSubmitButtonDisabledStateAction(true));
    }
    if (!solePower && numberOfLocalRepresentatives === 0) {
      void dispatch(updateSubmitButtonDisabledStateAction(false));
    }
  }, [solePower, numberOfRepresentatives, numberOfLocalRepresentatives]);

  const handleAddNewRepresentative = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (solePower && (numberOfLocalRepresentatives > 0 || numberOfRepresentatives > 0)) {
      return handleTooltipOpen();
    }
    if (numberOfRepresentatives === 4) {
      return handleTooltipOpen();
    }
    void dispatch(
      addNewAccountUserOnClickAction({
        [representativesField.nestedFields[0].name]: '',
        [representativesField.nestedFields[1].name]: '',
        [representativesField.nestedFields[2].name]: '',
        [representativesField.nestedFields[3].name]: new Date(0).toUTCString(),
        [representativesField.nestedFields[4].name]: 'en',
        [representativesField.nestedFields[5].name]: AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE,
      }),
    );
  };

  const handleAddNewAccountUserClick = (representativeIndex: number) => async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, ...representative } = representatives[representativeIndex];
    if (
      !representative[representativesField.nestedFields[0].name] ||
      !representative[representativesField.nestedFields[1].name] ||
      !representative[representativesField.nestedFields[2].name] ||
      !representative[representativesField.nestedFields[3].name] ||
      !representative[representativesField.nestedFields[4].name]
    )
      return;
    if (representative.id) {
      await handleUpdateAccountUser(
        {
          firstName: representative[representativesField.nestedFields[0].name],
          lastName: representative[representativesField.nestedFields[1].name],
          email: representative[representativesField.nestedFields[2].name],
          birthday: representative[representativesField.nestedFields[3].name],
          language: representative[representativesField.nestedFields[4].name],
          accountUserType: representative[representativesField.nestedFields[5].name],
          accountId: representative.accountId,
        },
        representative.id,
      );
      return;
    }
    handleAddNewAccountUser(representative);
  };

  const representativesElements = representatives.map((representative, index: number) => (
    <Grid item xs={12} lg={6} key={'companyaddperson' + index}>
      {(accountUserIndex !== index && representative.id) || (representative.id && accountUserIndex === -1) ? (
        <CompanyEditPerson
          accountUserType={t('company-register.step5.account-user.title', { index: index + 1 })}
          handleEditClick={handleEditIconClick(index)}
          handleDeleteClick={() => setIsOpenModal({ open: true, id: representative.id })}
          accountUser={representative}
          type={AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE}
        />
      ) : (
        <CompanyAddPerson
          type={AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE}
          arrayField={representativesField}
          title={t('company-register.step5.account-user.title', { index: index + 1 })}
          btnText={t('company-register.step5.account-user.btn-text')}
          index={index}
          onClick={handleAddNewAccountUserClick(index)}
          getFieldProps={getFieldProps}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          visibleErrors={errors}
          touched={touched}
          handleDeleteClick={() => setIsOpenModal({ open: true, index })}
        />
      )}
    </Grid>
  ));

  const handleConfirm = () => {
    const representativesCopy = [...representatives];
    if (isOpenModal?.index > -1 && !isOpenModal?.id) {
      representativesCopy.splice(isOpenModal.index, 1);
      dispatch(
        updateAccountUserDeleteAction({
          updatedField: representativesField.name,
          data: representativesCopy,
        }),
      );
    }
    if (isOpenModal?.id) {
      handleDeleteIconClick(isOpenModal?.id);
    }
    setIsOpenModal(null);
  };

  return (
    <>
      <Box className={classes.companyAddInfoFormContainer}>
        <Grid container>
          <Grid item xs={12}>
            <CompanyHeader title={t('company-register.step5.title')} />
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" className={classes.companyLegalAddRepresentativeDescription}>
              {t('company-register.step5.subtitle')}
            </Typography>
          </Grid>
        </Grid>
        <Grid container columnSpacing={3}>
          <Grid item xs={12}>
            {error && <FormAlert error={error} onClose={handleResetError} />}
          </Grid>
          {representativesElements}
          <Grid item xs={12} lg={6}>
            <Button
              // disabled={!solePower && numberOfRepresentatives === 0}
              style={{ height: '37px' }}
              type="button"
              variant="outlined"
              text={t('company-register.step5.account-user.add-btn-text')}
              icon={<PlusIcon />}
              iconPosition="left"
              onClick={handleAddNewRepresentative}
            />
            {openToolTip && (
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  onClose={handleTooltipClose}
                  open={openToolTip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  enterTouchDelay={0}
                  placement="top"
                  title={
                    solePower ? t('company-register.step5.tooltip-text-v2') : t('company-register.step5.tooltip-text')
                  }
                >
                  <InfoOutlined className={classes.infoIcon} onClick={handleTooltipOpen} />
                </Tooltip>
              </ClickAwayListener>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Representative Delete Modal */}
      {isOpenModal?.open && (
        <DeleteModalPartial
          title={t('company-register.step5.delete-modal-title')}
          confirmationMesage={t('company-register.step5.delete-modal-description')}
          handleConfirm={handleConfirm}
          handleCancel={() => setIsOpenModal(null)}
        />
      )}
    </>
  );
};
