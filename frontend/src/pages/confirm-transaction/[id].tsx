/* eslint-disable @roq/dir-contains-index */
/*eslint-disable  @typescript-eslint/explicit-module-boundary-types, @roq/no-invalid-page-resource*/
import { withLocale } from 'modules/locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfirmTransactionView } from 'views/confirm-transaction';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export const getStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default withLocale(ConfirmTransactionView);
