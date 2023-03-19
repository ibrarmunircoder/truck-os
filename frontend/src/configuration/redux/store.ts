/* eslint-disable @roq/no-eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { loadState, saveState, StateInterface } from 'configuration/redux/local-store';
import reducer from 'configuration/redux/reducer';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { AccountIdStateInterface } from 'modules/account-id/account-id.slice';
import { AccountSettingsStateInterface } from 'modules/account-settings';
import { AuthStateInterface } from 'modules/auth';
import { CompanyRegisterStateInterface } from 'modules/company-register';
import { InvoiceCreationInterface } from 'modules/invoice-creation/invoice-creation.slice';
import { FormStepStateInterface } from 'modules/invoice-creation/slices/form-step.slice';
import { NewDebtorEntryStateInterface } from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import { StepsVerifiedStateInterface } from 'modules/invoice-creation/slices/steps-verified.slice';
import { VirtualIbnStateInterface } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { LayoutStateInterface } from 'modules/layout/layout.slice';
import { MessageCenterStateInterface } from 'modules/message-center';
import { NotificationPreferencesStateInterface } from 'modules/notification-preferences/notification-preferences.slice';
import { NotificationsStateInterface } from 'modules/notifications/notifications.slice';
import { OrderStateInterface } from 'modules/orders/order.slice';
import { PaymentDashboardStateInterface } from 'modules/payment-dashboard';
import { SelectedDebtorStateInterface } from 'modules/selected-debtor/selected-debtor.slice';
import { ThemeStateInterface } from 'modules/theme/theme.slice';
import { UserFilesStateInterface } from 'modules/user-files/user-files.slice';
import { UserInvitesStateInterface } from 'modules/user-invites/user-invites.slice';
import { UsersStateInterface } from 'modules/users/users.slice';

export interface StoreInterface {
  auth: AuthStateInterface;
  notifications: NotificationsStateInterface;
  notificationPreferences: NotificationPreferencesStateInterface;
  messageCenter: MessageCenterStateInterface;
  theme: ThemeStateInterface;
  layout: LayoutStateInterface;
  userFiles: UserFilesStateInterface;
  users: UsersStateInterface;
  userInvites: UserInvitesStateInterface;
  companyRegister: CompanyRegisterStateInterface;
  invoiceCreation: InvoiceCreationInterface;
  selectedDebtor: SelectedDebtorStateInterface;
  virtualIbn: VirtualIbnStateInterface;
  newDebtorEntry: NewDebtorEntryStateInterface;
  accountId: AccountIdStateInterface;
  formStep: FormStepStateInterface;
  accountSettings: AccountSettingsStateInterface;
  paymentDashboard: PaymentDashboardStateInterface;
  stepsVerified: StepsVerifiedStateInterface;
  orders: OrderStateInterface;
}

const persistedState = loadState();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: persistedState,
});

let currentState: StateInterface = {
  theme: {},
  layout: {},
};

store.subscribe(() => {
  const newState = pick(store.getState(), Object.keys(currentState)) as StateInterface;

  if (!isEqual(currentState, newState)) {
    saveState(newState);
  }

  currentState = newState;
});

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @roq/exports-should-follow-conventions
export default store;
