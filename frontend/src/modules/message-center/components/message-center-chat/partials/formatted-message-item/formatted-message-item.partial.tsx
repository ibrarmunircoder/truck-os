import Box from '@mui/material/Box';
import clsx from 'clsx';
import parser, {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
  Text,
} from 'html-react-parser';
import { RightClickListener } from 'modules/common/components';
import { useMenu } from 'modules/common/hooks';
import {
  LinkPartial,
  ManageMessageMenu,
  MentionPartial,
} from 'modules/message-center/components/message-center-chat/partials';
import { useFormattedMessageItemStyles } from 'modules/message-center/components/message-center-chat/partials/formatted-message-item/formatted-message-item.styles';
import { useManageMessageMenu } from 'modules/message-center/hooks';
import React, { FunctionComponent, ReactElement, ReactNode, useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';

export interface FormattedMessageItemInterface {
  id: string;
  body: string;
  isSent?: boolean;
  isFirst?: boolean;
  isDeleted?: boolean;
}

const isElement = (domNode: DOMNode): domNode is Element => {
  const isTag = domNode.type === 'tag';
  const hasAttributes = (domNode as Element).attribs !== undefined;

  return isTag && hasAttributes;
};

const isParagraph = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  return domNode.tagName === 'p';
};

const isMention = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  const { attribs, children } = domNode;

  return (
    attribs.href &&
    attribs.href.indexOf('user:') > -1 &&
    children &&
    !!(children[0] as Text).data.match(/\@\[(([^\:]*):([^\]]*))]/g)
  );
};

const isLink = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  return domNode.tagName === 'a';
};

const extractMentionData = (el: Element): [id: string, name: string] => {
  const { children } = el;
  const text = (children[0] as Text).data;

  const groups = /\@\[(([^\:]*):([^\]]*))]/g.exec(text);

  const id = groups[2];
  const name = groups[3];

  return [id, name];
};

const formatParagraph = (el: Element, options?: HTMLReactParserOptions): ReactElement => {
  const { ...props } = attributesToProps(el.attribs);
  const paragraphClass = clsx(props.class, 'leading-6 min-h-6');

  return (
    <p {...props} className={paragraphClass}>
      {domToReact(el.children, options)}
    </p>
  );
};

const formatMention = (el: Element): ReactElement => {
  const [id, name] = extractMentionData(el);
  return <MentionPartial userId={id} name={name} />;
};

const formatLink = (el: Element, ignoreClick?: boolean): ReactElement => (
  <LinkPartial href={el.attribs.href} ignoreClick={ignoreClick} />
);

const defaultOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isParagraph(domNode)) {
      return formatParagraph(domNode as Element, defaultOptions);
    }

    if (isMention(domNode)) {
      return formatMention(domNode as Element);
    }

    if (isLink(domNode)) {
      return formatLink(domNode as Element);
    }
  },
};

const previewOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isParagraph(domNode)) {
      if ((domNode as Element).children.length > 0) {
        return false;
      }

      return formatParagraph(domNode as Element, previewOptions);
    }

    if (isMention(domNode)) {
      return formatMention(domNode as Element);
    }

    if (isLink(domNode)) {
      return formatLink(domNode as Element, true);
    }
  },
};

export const sanitize = (content: string): string =>
  sanitizeHtml(content, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'img', 'span', 'strong', 'sub'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel', 'user'],
  });

export const formatContent = (content: string): ReactNode => parser(sanitize(content), defaultOptions);
export const formatPreviewContent = (content: string): ReactNode => parser(sanitize(content), previewOptions);

export const FormattedMessageItemPartial: FunctionComponent<FormattedMessageItemInterface> = ({
  id,
  body,
  isSent,
  isFirst,
  isDeleted,
}) => {
  const classes = useFormattedMessageItemStyles(
    useMemo(() => ({ isSent, isFirst, isDeleted }), [isSent, isFirst, isDeleted]),
  );

  const content = useMemo(() => formatContent(body), [body]);

  const { anchorElement, setAnchorElement, onClose } = useMenu();
  const { isOpen: isMenuOpen, open: openMenu, close: closeMenu } = useManageMessageMenu();

  const canEdit = isSent && !isDeleted;

  const handleRightMessageItemClick = (event) => {
    if (!isMenuOpen) {
      openMenu();
    }

    setAnchorElement(event.target);
  };

  const handleManageMenuClose = () => {
    onClose();
    closeMenu();
  };

  return (
    <RightClickListener onRightClick={handleRightMessageItemClick} className={classes.container}>
      <>
        <Box className={classes.box}>{content}</Box>
        {canEdit && (
          <ManageMessageMenu
            messageId={id}
            anchorEl={anchorElement}
            open={isMenuOpen}
            onClose={handleManageMenuClose}
          />
        )}
      </>
    </RightClickListener>
  );
};
