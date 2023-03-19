import { EditorPlugin } from '@draft-js-plugins/editor';
import createMentionPlugin, { MentionData } from '@draft-js-plugins/mention';
import { IConvertFromHTMLConfig, IConvertToHTMLConfig } from 'draft-convert';
import createLinkDetectionPlugin from 'draft-js-link-detection-plugin';
import { MessageCenterUserInterface } from 'modules/message-center';
import {
  MentionItemPartial,
  MentionsPopoverPartial,
  TextareaMentionPartial,
} from 'modules/message-center/components/message-center-chat/partials';
import {
  ChatMessageTextareaInterface,
  ControlledChatMessageTextarea,
  MessageTextarea,
} from 'modules/message-center/components/message-center-chat/partials/message-textarea/message-textarea.partial';
import { useFetchRecipients } from 'modules/message-center/hooks';
import { CSSProperties, FunctionComponent, RefObject, useCallback, useMemo, useState } from 'react';

const formatUserLink = (id: string) => `user:${id}`;

const formatRecipientToSuggestion = (
  recipient: MessageCenterUserInterface,
): MessageCenterUserInterface & MentionData => ({
    ...recipient,
    name: recipient.fullName,
    link: formatUserLink(recipient.id),
  });

const positionSuggestions = ({ decoratorRect }): CSSProperties => {
  const top = decoratorRect.top;
  const left = decoratorRect.left;

  return {
    left: left + 'px',
    top: top + 'px',
    display: 'block',
    position: 'fixed',
    transform: 'scale(1) translateY(-100%)',
    transformOrigin: '1em 0% 0px',
    transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)',
  };
};

const convertToHTMLConfig: IConvertToHTMLConfig = {
  entityToHTML: (entity, originalText) => {
    if (entity.type === 'mention') {
      return (
        <a href={entity.data.mention.link}>
          @[{entity.data.mention.id}:{entity.data.mention.name}]
        </a>
      );
    }

    if (entity.type === 'LINK') {
      return (
        <a href={entity.data.url} target="_blank" className="underline" rel="noreferrer">
          {entity.data.url}
        </a>
      );
    }

    return originalText;
  },
};

const convertFromHTMLConfig: IConvertFromHTMLConfig = {
  textToEntity: (text, createEntity) => {
    const result = [];
    text.replace(/\@\[(([^\:]*):([^\]]*))]/g, (match, userLink, offset) => {
      const [id, name] = userLink.split(':');

      const entityKey = createEntity('mention', 'IMMUTABLE', {
        mention: {
          id,
          name,
          link: formatUserLink(id),
          avatar: '',
        },
      });

      result.push({
        entity: entityKey,
        offset,
        length: match.length,
        result: `@${name}`,
      });

      return '';
    });

    return result;
  },
};

export interface AdvancedMessageTextareaInterface
  extends Omit<ChatMessageTextareaInterface, 'children' | 'ref' | 'convertToHTMLConfig' | 'convertFromHTMLConfig'> {
  forwardedRef?: RefObject<ControlledChatMessageTextarea>;
}

export const AdvancedMessageTextareaPartial: FunctionComponent<AdvancedMessageTextareaInterface> = ({
  forwardedRef,
  value,
  ...rest
}) => {
  const { recipients, initialFetch: fetchRecipients } = useFetchRecipients();

  const [open, setOpen] = useState(true);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const linkifyPlugin = createLinkDetectionPlugin();

    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      supportWhitespace: true,
      positionSuggestions,
      mentionComponent: TextareaMentionPartial,
    });

    return {
      plugins: [linkifyPlugin, mentionPlugin] as EditorPlugin[],
      MentionSuggestions: mentionPlugin.MentionSuggestions,
    };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback((props) => {
     fetchRecipients({
      limit: 5,
      offset: 0,
      filter: props.value
    });
  }, []);

  const suggestions: (MessageCenterUserInterface & MentionData)[] = useMemo(
    () => recipients.map(formatRecipientToSuggestion),
    [recipients],
  );

  return (
    <MessageTextarea
      name="message"
      ref={forwardedRef}
      value={value}
      plugins={plugins}
      convertToHTMLConfig={convertToHTMLConfig}
      convertFromHTMLConfig={convertFromHTMLConfig}
      {...rest}
    >
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        popoverComponent={<MentionsPopoverPartial />}
        entryComponent={MentionItemPartial}
      />
    </MessageTextarea>
  );
};
