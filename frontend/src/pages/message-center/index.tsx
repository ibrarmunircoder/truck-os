/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @roq/no-invalid-page-resource */
import { withLocale } from 'modules/locale';
import { MessageCenterChatSubpageType } from 'modules/message-center/components/message-center-chat';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MessageCenterView } from 'views/message-center';

export const getServerSideProps = async ({ query, locale }: GetServerSidePropsContext) => {
  const id = (query.id as string) || null;
  let subpage: MessageCenterChatSubpageType = null;

  if (query.new) {
    subpage = 'newConversation';
  } else if (query.members && id) {
    subpage = `conversation${query.members === 'remove' ? 'Remove' : 'Add'}Members` as MessageCenterChatSubpageType;
  } else if (id) {
    subpage = 'conversation';
  }

  return {
    props: {
      id,
      subpage,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default withLocale(MessageCenterView);
