const routes = require('../names');

const de = {
  [routes.acceptInvite]: {
    pathname: '/einladung-akzeptieren',
  },
  [routes.accountActivate]: {
    pathname: '/profil-aktivierung',
  },
  [routes.accountSettings]: {
    pathname: '/account-settings',
  },
  [routes.accountActivateProviderLink]: {
    pathname: '/profil-aktivierung-provider-link',
  },
  [routes.forgotPassword]: {
    pathname: '/passwort-vergessen',
  },
  [routes.login]: {
    pathname: '/anmeldung',
  },
  [routes.messageCenter]: {
    pathname: '/nachrichten',
  },
  [routes.profile]: {
    pathname: '/profil/[userId]/[[...action]]',
  },
  [routes.register]: {
    pathname: '/registrieren',
  },
  [routes.restorePassword]: {
    pathname: '/passwort-wiederherstellen',
  },
  [routes.settings]: {
    pathname: '/einstellungen',
  },
  [routes.users]: {
    pathname: '/nutzer',
  },
  [routes.usersActive]: {
    pathname: '/nutzer/aktiv',
  },
  [routes.usersInactive]: {
    pathname: '/nutzer/inaktiv',
  },
  [routes.usersInvited]: {
    pathname: '/nutzer/eingeladen',
  },
  [routes.usersCanceled]: {
    pathname: '/nutzer/abgesagt',
  },
  [routes.userEdit]: {
    pathname: '/nutzer/bearbeiten/[id]',
  },
  [routes.files]: {
    pathname: '/dateien',
  },
  [routes.filesEdit]: {
    pathname: '/dateien/bearbeiten/[id]',
  },
  [routes.typography]: {
    pathname: '/typographiee',
  },
  [routes.home]: {
    pathname: '/',
  },
  [routes.imprint]: {
    pathname: '/impressum',
  },
  [routes.terms]: {
    pathname: '/geschaeftsbedingungen',
  },
  [routes.privacy]: {
    pathname: '/datenschutz',
  },
  [routes.dataPreferences]: {
    pathname: '/data-preferences',
  },
  [routes.exampleAuthors]: {
    pathname: '/example/authors',
  },
  [routes.exampleBooks]: {
    pathname: '/example/books',
  },
  [routes.exampleCreateAuthor]: {
    pathname: '/example/author/create',
  },
  [routes.exampleEditAuthor]: {
    pathname: '/example/author/edit/[id]',
  },
  [routes.exampleCreateBook]: {
    pathname: '/example/book/create',
  },
  [routes.exampleEditBook]: {
    pathname: '/example/book/edit/[id]',
  },
  [routes.confirmTransaction]: {
    pathname: '/confirm-transaction',
  },
  [routes.paymentStatus]: {
    pathname: '/payment-status',
  },
  [routes.paymentDashboard]: {
    pathname: '/payment-dashboard',
  },
  [routes.companyRegister]: {
    pathname: '/company-register',
  },
  [routes.invoiceCreation]: {
    pathname: '/invoice-creation',
  },
  [routes.invoiceDetails]: {
    pathname: '/invoice-details',
  },
  [routes.accountPending]: {
    pathname: '/account-pending',
  },
  [routes.userReceivables]: {
    pathname: '/users/receivales',
  },
};

module.exports = de;
