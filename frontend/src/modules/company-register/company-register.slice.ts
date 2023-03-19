/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import {
  accountQueryAction,
  addCompanyAccountUserAction,
  businessDataUpdateAction,
  deleteAccountUserAction,
  updateAccountUserAction,
} from 'modules/company-register/actions';
import { ALLOWED_TRADE_DOCUMENTS } from 'views/company-register/constants';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { AccountUserInterface } from 'views/company-register/interfaces';
import {
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBasicInfoFormModel,
  companyDocumentUploadFormModel,
  CompanyRegisterInterface,
  initialValues,
} from 'views/company-register/utils';

const { representatives } = companyAddRepresentativeFormModel.formField;
const { owners } = companyAddOwnerFormModel.formField;
const { companyDocument } = companyDocumentUploadFormModel.formField;
const { addressAddon, postcode, phoneNumber } = companyBasicInfoFormModel.formField;

export interface CompanyRegisterStateInterface {
  isLoading: boolean;
  error: null;
  viewActiveStep: number;
  activeStep: number;
  account: CompanyRegisterInterface;
  isSubmitButtonDisabled: boolean;
}

const initialState: CompanyRegisterStateInterface = {
  isLoading: false,
  isSubmitButtonDisabled: false,
  error: null,
  viewActiveStep: 0,
  activeStep: 0,
  account: {
    ...initialValues,
  },
};

const updateActiveStep = (newViewActiveStep: number) => {
  if ([3, 4].includes(newViewActiveStep)) {
    return 1;
  }
  if (newViewActiveStep === 5) {
    return 2;
  }
  if (newViewActiveStep >= 6) {
    return 3;
  }
  return 0;
};

const processReducer = (state = initialState) => {
  state.isLoading = true;
};

const errorReducer = (state = initialState, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const accountReducer = (state = initialState, { payload }) => {
  state.account = {
    ...state.account,
    ...(payload.data.length ? payload.data[0] : {}),
    [phoneNumber.name]:
      payload.data && payload.data.length && payload.data[0][phoneNumber.name]
        ? payload.data[0][phoneNumber.name]
        : '49',
    [addressAddon.name]: payload.data && payload.data.length ? payload.data[0][addressAddon.name] : '',
    postalCode: payload.data.length && payload.data[0]?.[postcode.name] ? payload.data[0]?.[postcode.name] : '',
    [representatives.name]:
      payload && payload.data?.length && payload.data[0].accountUsers.data?.length
        ? payload.data[0].accountUsers.data.filter(
            (accountUser: AccountUserInterface) =>
              accountUser.accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE,
          )
        : (state.account[representatives.name] as []),
    [owners.name]:
      payload && payload.data?.length && payload.data[0].accountUsers.data?.length
        ? payload.data[0].accountUsers.data.filter(
            (accountUser: AccountUserInterface) =>
              accountUser.accountUserType === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER,
          )
        : (state.account[owners.name] as []),
    accountUsers: undefined,
  };
};

const updateAccountBusinessDataReducer = (state = initialState, { payload }) => {
  state.account = {
    ...state.account,
    ...payload,
  };
  const legalFormValidStep =
    state.viewActiveStep === 0 ? (ALLOWED_TRADE_DOCUMENTS.includes(payload.legalForm) ? 1 : 2) : 1;
  const newViewActiveStep = state.viewActiveStep + legalFormValidStep;
  state.viewActiveStep = newViewActiveStep;
  state.activeStep = updateActiveStep(newViewActiveStep);
};

const getAccountUserUpdateFormField = (payload) =>
  payload && payload.accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE
    ? representatives.name
    : owners.name;

const addAccountUserReducer = (state = initialState, { payload }) => {
  const updateField = getAccountUserUpdateFormField(payload);
  const accountUsers = state.account[updateField] as [];
  const numberOfAccountUsers = accountUsers.reduce((total: number, accountUser: AccountUserInterface) => {
    total = accountUser?.id ? ++total : total;
    return total;
  }, 0);

  state.account = {
    ...state.account,
    [updateField]:
      numberOfAccountUsers > 0
        ? [...accountUsers.filter((accountUser: AccountUserInterface) => accountUser.id), payload]
        : [payload],
  };
};

const updateAccountLegalRepresentative = (state = initialState, { payload }) => {
  const updateField = getAccountUserUpdateFormField(payload);
  let accountUsers: AccountUserInterface[] = state.account[updateField] as [];
  accountUsers = accountUsers.filter((accountUser) => accountUser.id !== payload.id);
  state.account = {
    ...state.account,
    [updateField]: [payload, ...accountUsers],
  };
};

const deleteAccountLegalRepresentative = (state = initialState, { payload }) => {
  const accountRepresentatives: AccountUserInterface[] = state.account.representatives as [];
  const accountOwners: AccountUserInterface[] = state.account.owners as [];

  const isRepresentative = accountRepresentatives?.find((representative) => representative.id === payload);
  const isOwner = accountOwners?.find((owner) => owner.id === payload);

  const deleteField: any = isRepresentative ? 'representatives' : isOwner ? 'owners' : '';

  let accountUsers: AccountUserInterface[] = state.account[deleteField] as [];
  accountUsers = accountUsers.filter((accountUser) => accountUser.id !== payload);

  state.account = {
    ...state.account,
    [deleteField]: [...accountUsers],
  };
};

export const companyRegisterSlice = createSlice({
  name: 'company-register',
  initialState,
  reducers: {
    updateAddStepAction: (state = initialState, { payload }) => {
      state.viewActiveStep = payload;
      state.activeStep = updateActiveStep(payload);
    },
    updateReduceStepAction: (state = initialState, { payload }) => {
      state.viewActiveStep = payload;
      state.activeStep = updateActiveStep(payload);
    },
    updateSubmitButtonDisabledStateAction: (state = initialState, { payload }) => {
      state.isSubmitButtonDisabled = payload;
    },
    addNewAccountUserOnClickAction: (state = initialState, { payload }) => {
      const updateField = getAccountUserUpdateFormField(payload);
      state.account = {
        ...state.account,
        [updateField]: [...(state.account[updateField] as []), payload],
      };
    },
    updateAccountUserDeleteAction: (state = initialState, { payload }) => {
      state.account = {
        ...state.account,
        [payload.updatedField]: payload.data,
      };
    },
    addFileUploadError: (state = initialState, { payload }) => {
      state.error = payload;
    },
    addAccountDocument: (state = initialState, { payload }) => {
      const { file } = payload;
      state.account[companyDocument.name] = [file];
    },
    resetError: (state = initialState) => {
      state.error = null;
    },
    setError: (state = initialState, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: {
    [accountQueryAction.pending.type]: processReducer,
    [accountQueryAction.rejected.type]: errorReducer,
    [accountQueryAction.fulfilled.type]: accountReducer,
    [businessDataUpdateAction.pending.type]: processReducer,
    [businessDataUpdateAction.rejected.type]: errorReducer,
    [businessDataUpdateAction.fulfilled.type]: updateAccountBusinessDataReducer,
    [addCompanyAccountUserAction.pending.type]: processReducer,
    [addCompanyAccountUserAction.rejected.type]: errorReducer,
    [addCompanyAccountUserAction.fulfilled.type]: addAccountUserReducer,
    [updateAccountUserAction.pending.type]: processReducer,
    [updateAccountUserAction.rejected.type]: errorReducer,
    [updateAccountUserAction.fulfilled.type]: updateAccountLegalRepresentative,
    [deleteAccountUserAction.pending.type]: processReducer,
    [deleteAccountUserAction.rejected.type]: errorReducer,
    [deleteAccountUserAction.fulfilled.type]: deleteAccountLegalRepresentative,
  },
});

export default companyRegisterSlice.reducer;

export const {
  updateAddStepAction,
  updateReduceStepAction,
  updateSubmitButtonDisabledStateAction,
  addNewAccountUserOnClickAction,
  addAccountDocument,
  updateAccountUserDeleteAction,
  addFileUploadError,
  resetError,
  setError,
} = companyRegisterSlice.actions;

export { accountQueryAction, addCompanyAccountUserAction, updateAccountUserAction, deleteAccountUserAction };
