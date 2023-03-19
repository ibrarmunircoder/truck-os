import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { useTranslation } from 'modules/common/hooks';
import { MessageCenterChat, MessageCenterChatSubpageType } from 'modules/message-center/components/message-center-chat';

export interface MessageCenterViewInterface {
  id?: string;
  subpage?: MessageCenterChatSubpageType;
}

export const MessageCenterView = withAuth<MessageCenterViewInterface>()(({ id, subpage }) => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('title_message-center')}>
      <MessageCenterChat
        initialId={id}
        initialSubpage={subpage}
      />
    </MainLayout>
  );
});
