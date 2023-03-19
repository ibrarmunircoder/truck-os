import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingSkeleton } from 'modules/common/components';
import { useTranslation } from 'modules/common/hooks';
import { useFetchConversations } from 'modules/message-center/hooks';
import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

export interface ChatConversationNotSelectedScreenInterface extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const ConversationNotSelectedScreenPartial: FunctionComponent<ChatConversationNotSelectedScreenInterface> = ({
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  const { isLoading } = useFetchConversations();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Box display="flex" alignItems="center" height="100%" paddingX={6} paddingY={3} {...rest}>
      {children ? (
        children
      ) : (
        <Typography variant="h6" textAlign="center">
          {t('no-conversation-selected-message')}
        </Typography>
      )}
    </Box>
  );
};
