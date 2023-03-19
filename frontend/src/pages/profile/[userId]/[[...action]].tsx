/* eslint-disable @roq/no-invalid-dirname, @roq/dir-contains-index */
import { withLocale } from 'modules/locale';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ProfileView } from 'views/profile';

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => ({
  props: {
    userId: query.userId as string,
    editMode: query?.action?.[0] === 'edit',
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLocale(ProfileView);
