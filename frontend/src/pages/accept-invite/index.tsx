/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @roq/no-invalid-page-resource */
import { withLocale } from 'modules/locale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AcceptInviteView } from 'views/accept-invite';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
export default withLocale(AcceptInviteView);
