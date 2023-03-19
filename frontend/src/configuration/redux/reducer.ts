/* eslint-disable @roq/no-eslint-disable */
import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import pick from 'lodash/pick';
import accountId from 'modules/account-id/account-id.slice';
import accountSettings from 'modules/account-settings/account-settings.slice';
import auth from 'modules/auth/auth.slice';
import companyRegister from 'modules/company-register/company-register.slice';
import invoiceCreation from 'modules/invoice-creation/invoice-creation.slice';
import formStep from 'modules/invoice-creation/slices/form-step.slice';
import newDebtorEntry from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import stepsVerified from 'modules/invoice-creation/slices/steps-verified.slice';
import virtualIbn from 'modules/invoice-creation/slices/virtual-ibn.slice';
import layout from 'modules/layout/layout.slice';
import messageCenter from 'modules/message-center/message-center.slice';
import notificationPreferences from 'modules/notification-preferences/notification-preferences.slice';
import notifications from 'modules/notifications/notifications.slice';
import orders from 'modules/orders/order.slice';
import paymentDashboard from 'modules/payment-dashboard/payment-dashboard.slice';
import selectedDebtor from 'modules/selected-debtor/selected-debtor.slice';
import theme from 'modules/theme/theme.slice';
import userFiles from 'modules/user-files/user-files.slice';
import userInvites from 'modules/user-invites/user-invites.slice';
import users from 'modules/users/users.slice';

export const appReducer = combineReducers({
  auth,
  notifications,
  notificationPreferences,
  messageCenter,
  theme,
  layout,
  userFiles,
  users,
  userInvites,
  invoiceCreation,
  companyRegister,
  selectedDebtor,
  virtualIbn,
  newDebtorEntry,
  accountId,
  formStep,
  accountSettings,
  paymentDashboard,
  stepsVerified,
  orders,
});

export type RootState = ReturnType<typeof appReducer>;

const cleanState = (state: RootState, action: AnyAction, excludeFromReset = ['']): RootState => {
  const cleanedState = pick(state, excludeFromReset) as RootState;
  return appReducer(cleanedState, action);
};

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logout/fulfilled') {
    return cleanState(state, action, ['theme']);
  }
  return appReducer(state, action);
};

// eslint-disable-next-line @roq/exports-should-follow-conventions
export default rootReducer;
