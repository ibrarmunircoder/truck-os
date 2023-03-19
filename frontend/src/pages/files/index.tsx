/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types, @roq/no-invalid-page-resource */
import { withLocale } from 'modules/locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FilesView } from 'views/files';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default withLocale(FilesView);
