/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @roq/no-invalid-page-resource */
/* eslint-disable @roq/dir-contains-index */
import { withLocale } from 'modules/locale';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UsersView } from 'views/users';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLocale(UsersView);
