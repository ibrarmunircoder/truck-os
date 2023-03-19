import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
import { useCompanyAddOwnerStyles } from 'views/company-register/partials/company-add-owner/company-add-owner.styles';
import { CompanyAddPerson } from 'views/company-register/partials/company-add-person/company-add-person.partial';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { ICompanyAddOwnerFormModel } from 'views/company-register/utils';

interface ICompanyAddOwnerProps {
  formModel: ICompanyAddOwnerFormModel;
}

const PlusIcon = () => <img src="/static/icons/plus-icon-v2.svg" alt="Add Button" />;
export const CompanyAddOwner: FunctionComponent<ICompanyAddOwnerProps> = ({ formModel }): React.ReactElement => {
  const { owners: ownersField } = formModel.formField;
  const classes = useCompanyAddOwnerStyles();
  const {
    handleAddNewAccountUser,
    handleUpdateAccountUser,
    accountUserIndex,
    handleEditIconClick,
    handleDeleteIconClick,
    error,
    handleResetError,
  } = useAddAccountUser();
  const formik = useFormikContext();
  const { values, setFieldValue, getFieldProps, handleBlur, touched, errors } = formik;
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const owners = values[ownersField.name];

  const [isOpenModal, setIsOpenModal] = useState(null);

  const numberOfOwners = useMemo(
    () =>
      owners.reduce((total: number, owner: AccountUserInterface) => {
        total = owner.id ? ++total : total;
        return total;
      }, 0),
    [owners],
  );

  const numberOfLocalFormOwners = useMemo(
    () =>
      owners.reduce((total: number, owner: AccountUserInterface) => {
        total = owner.id ? total : ++total;
        return total;
      }, 0),
    [owners],
  );

  useEffect(() => () => void dispatch(updateSubmitButtonDisabledStateAction(false)), []);

  useEffect(() => {
    if (numberOfOwners === 0) {
      void dispatch(updateSubmitButtonDisabledStateAction(true));
    }
    if (numberOfOwners >= 1) {
      void dispatch(updateSubmitButtonDisabledStateAction(false));
    }
    if (numberOfLocalFormOwners > 0) {
      void dispatch(updateSubmitButtonDisabledStateAction(true));
    }
  }, [numberOfOwners, numberOfLocalFormOwners]);

  const handleAddNewOwner = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    void dispatch(
      addNewAccountUserOnClickAction({
        [ownersField.nestedFields[0].name]: '',
        [ownersField.nestedFields[1].name]: '',
        [ownersField.nestedFields[2].name]: '',
        [ownersField.nestedFields[3].name]: new Date(0).toUTCString(),
        [ownersField.nestedFields[4].name]: AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER,
        [ownersField.nestedFields[5].name]: '',
        [ownersField.nestedFields[6].name]: 'DE',
        [ownersField.nestedFields[7].name]: '',
        [ownersField.nestedFields[8].name]: '',
        [ownersField.nestedFields[9].name]: '',
        [ownersField.nestedFields[10].name]: 'Germany',
        [ownersField.nestedFields[11].name]: null,
      }),
    );
  };
  const handleAddNewAccountUserClick = (ownerIndex: number) => async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, ...owner } = owners[ownerIndex];
    if (
      !owner[ownersField.nestedFields[0].name] ||
      !owner[ownersField.nestedFields[1].name] ||
      !owner[ownersField.nestedFields[2].name] ||
      !owner[ownersField.nestedFields[3].name] ||
      !owner[ownersField.nestedFields[4].name]
    )
      return;
    if (owner.id) {
      await handleUpdateAccountUser(
        {
          firstName: owner[ownersField.nestedFields[0].name],
          lastName: owner[ownersField.nestedFields[1].name],
          email: owner[ownersField.nestedFields[2].name],
          birthday: owner[ownersField.nestedFields[3].name],
          accountUserType: owner[ownersField.nestedFields[4].name],
          birthplace: owner[ownersField.nestedFields[5].name],
          nationality: owner[ownersField.nestedFields[6].name],
          streetAndNumber: owner[ownersField.nestedFields[7].name],
          postalCode: owner[ownersField.nestedFields[8].name],
          city: owner[ownersField.nestedFields[9].name],
          country: owner[ownersField.nestedFields[10].name],
          houseNumber: owner[ownersField.nestedFields[11].name],
          accountId: owner.accountId,
        },
        owner.id,
      );
      return;
    }
    handleAddNewAccountUser(owner);
  };

  const handleConfirm = (): void => {
    if (isOpenModal?.index > -1 && !isOpenModal?.id) {
      const ownersCopy = [...owners];
      ownersCopy.splice(isOpenModal.index, 1);
      dispatch(
        updateAccountUserDeleteAction({
          updatedField: ownersField.name,
          data: ownersCopy,
        }),
      );
    }
    if (isOpenModal?.id) {
      handleDeleteIconClick(isOpenModal?.id);
    }
    setIsOpenModal(null);
  };

  const ownersElemet = owners?.map((owner, index: number) => (
    <Grid item xs={12} lg={6} key={'companyaddperson' + index}>
      {(accountUserIndex !== index && owner.id) || (owner.id && accountUserIndex === -1) ? (
        <CompanyEditPerson
          accountUserType={t('company-register.step6.account-user.title', { index: index + 1 })}
          handleEditClick={handleEditIconClick(index)}
          handleDeleteClick={() => setIsOpenModal({ open: true, id: owner.id })}
          accountUser={owner}
          type={AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER}
        />
      ) : (
        <CompanyAddPerson
          type={AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER}
          arrayField={ownersField}
          title={t('company-register.step6.account-user.title', { index: index + 1 })}
          btnText={t('company-register.step6.account-user.btn-text')}
          index={index}
          getFieldProps={getFieldProps}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          visibleErrors={errors}
          touched={touched}
          onClick={handleAddNewAccountUserClick(index)}
          handleDeleteClick={() => setIsOpenModal({ open: true, index })}
        />
      )}
    </Grid>
  ));

  return (
    <>
      <Box className={classes.companyAddOwnerContainer}>
        <Grid container>
          <Grid item xs={12}>
            <CompanyHeader title={t('company-register.step6.title')} />
          </Grid>
          {owners.length === 0 && (
            <Grid item xs={12}>
              <Typography component="p" className={classes.companyLegalAddOwnerDescription}>
                {t('company-register.step6.description1')}
              </Typography>
              <Typography component="p" className={classes.companyLegalAddOwnerDescription}>
                {t('company-register.step6.description2')}
              </Typography>
              <Typography component="p" className={classes.companyLegalAddOwnerDescription}>
                {t('company-register.step6.description3')}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container columnSpacing={3}>
          <Grid item xs={12}>
            {error && <FormAlert error={error} onClose={handleResetError} />}
          </Grid>
          {ownersElemet}
          <Grid item xs={12} lg={6} pl={owners.length === 0 ? '20px' : '0'}>
            <Button
              disabled={numberOfLocalFormOwners > 0 && numberOfOwners === 0}
              style={{ height: '37px' }}
              type="button"
              variant="outlined"
              text={t('company-register.step6.account-user.add-btn-text')}
              icon={<PlusIcon />}
              iconPosition="left"
              onClick={handleAddNewOwner}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Beneficial Owner Delete Modal */}
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
