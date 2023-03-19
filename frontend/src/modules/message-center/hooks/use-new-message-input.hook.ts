import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
// eslint-disable-next-line @roq/imports-should-follow-conventions
import {
  ControlledChatMessageTextarea
} from 'modules/message-center/components/message-center-chat/partials/message-textarea/message-textarea.partial';
import { RefObject, useMemo, useRef, useState } from 'react';
export interface UseNewMessageInputHookInterface {
  value: string;
  isEmpty: boolean;
  ref: RefObject<ControlledChatMessageTextarea>;
  change: (nextValue: string) => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  reset: () => void;
}

export const useNewMessageInput = (defaultValue: string): UseNewMessageInputHookInterface => {
  const ref = useRef<ControlledChatMessageTextarea>(null);
  const [value, setValue] = useState(defaultValue);

  const isValueEmpty = useMemo(() => {
    // extract value between <p></p>
    const removeTagRegex = /<\/?p[^>]*>/g;
    const result = value?.replace(removeTagRegex, "");
    const [stringValue] = result?.match(/(.|\s)*\S(.|\s)*/) || [];
    return (isEmpty(stringValue?.trim()) || isEqual(value, defaultValue?.replace(removeTagRegex, "")));
  }, [value]);

  const change = (nextValue: string) => setValue(nextValue)

  const clear = () => setValue(defaultValue)

  const focus = () => ref?.current?.focus()

  const blur = () => ref?.current?.blur()

  const reset = () => {
    focus();
    clear();
  }

  return {
    isEmpty: isValueEmpty,
    value,
    ref,
    change,
    focus,
    blur,
    clear,
    reset
  };
};
