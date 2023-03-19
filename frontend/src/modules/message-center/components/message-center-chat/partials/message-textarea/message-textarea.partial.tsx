/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @roq/no-eslint-disable */
import 'draft-js/dist/Draft.css';

import Editor, { PluginEditorProps } from '@draft-js-plugins/editor';
import Box from '@mui/material/Box';
import { publicConfig } from 'configuration/app';
import { convertFromHTML, convertToHTML, IConvertFromHTMLConfig, IConvertToHTMLConfig } from 'draft-convert';
import {
  ContentState,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  SelectionState,
} from 'draft-js';
import _noop from 'lodash/fp/noop';
import { useTranslation } from 'modules/common/hooks';
import { forwardRef, ReactNode, RefObject, useEffect, useState } from 'react';

// eslint-disable-next-line @roq/name-of-class-and-function-rule
export class ControlledChatMessageTextarea extends Editor {}

export interface ChatMessageTextareaInterface extends Omit<PluginEditorProps, 'onChange' | 'editorState'> {
  id?: string;
  name?: string;
  children?: ReactNode;
  rounded?: boolean;
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  convertToHTMLConfig: IConvertToHTMLConfig;
  convertFromHTMLConfig: IConvertFromHTMLConfig;
}

export const MessageTextarea = forwardRef<ControlledChatMessageTextarea, ChatMessageTextareaInterface>(
  (
    {
      id,
      children,
      name,
      className,
      value = '',
      placeholder,
      onChange = _noop,
      onEnter = _noop,
      onBlur = _noop,
      onFocus = _noop,
      plugins,
      convertToHTMLConfig,
      convertFromHTMLConfig,
      ...rest
    },
    ref: RefObject<ControlledChatMessageTextarea>,
  ) => {
    const MAX_CHAT_CHARACTERS = publicConfig.frontend.maxChatCharacters;
    const { t } = useTranslation();
    const [rawValue, setRawValue] = useState(value);

    const [editorState, setEditorState] = useState(() =>
      EditorState.createWithContent(convertFromHTML(convertFromHTMLConfig)(value)),
    );

    useEffect(() => {
      const needUpdate = value !== rawValue;

      if (needUpdate) {
        const nextContentState = convertFromHTML(convertFromHTMLConfig)(value);
        let nextEditorState = EditorState.push(editorState, nextContentState, 'apply-entity');
        nextEditorState = EditorState.moveFocusToEnd(nextEditorState);
        setEditorState(nextEditorState);
        setRawValue(value);
      }
    }, [value]);

    const getRawValue = (stateToConvert?: EditorState): string =>
      convertToHTML(convertToHTMLConfig)(stateToConvert.getCurrentContent());

    const handleEditorClick = () => ref.current.focus();

    const handleChange = (nextState: EditorState) => {
      setEditorState(nextState);
      const nextRawValue = getRawValue(nextState);
      if (rawValue !== nextRawValue) {
        setRawValue(nextRawValue);
        onChange(nextRawValue);
      }
    };

    const keyBindingFn = (e) => {
      const hasCommandKeys =
        KeyBindingUtil.isCtrlKeyCommand(e) ||
        KeyBindingUtil.isOptionKeyCommand(e) ||
        KeyBindingUtil.hasCommandModifier(e) ||
        e.nativeEvent.shiftKey;

      if (!hasCommandKeys && e.key === 'Enter') {
        return 'submit';
      }

      return getDefaultKeyBinding(e);
    };

    const handleKeyCommand = (command) => {
      if (command === 'submit') {
        onEnter();
        return 'handled';
      }
      return 'not-handled';
    };

    const handleBeforeInput = (chars: string, latestEditorState: EditorState): DraftHandleValue => {
      // if the user is selecting the whole message from the editor,
      // then type something to replace it, then it let happen
      if (!latestEditorState.getSelection().isCollapsed()) {
        return 'not-handled';
      }

      return latestEditorState.getCurrentContent().getPlainText().length === MAX_CHAT_CHARACTERS
        ? 'handled'
        : 'not-handled';
    };

    /**
     * On Chrome and Safari, calling focus on contenteditable focuses the
     * cursor at the first character. Use this helper to move that cursor.
     */
    const moveSelectionTo = (es: EditorState, focusOffset: number): EditorState => {
      const blockSelection = SelectionState.createEmpty(es.getSelection().getAnchorKey()).merge({
        anchorOffset: focusOffset,
        focusOffset,
      });

      return EditorState.forceSelection(es, blockSelection);
    };

    const handlePastedText = (pastedText: string, html, latestEditorState: EditorState): DraftHandleValue => {
      const currentContent = latestEditorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText().length;
      const currentSelection = latestEditorState.getSelection();
      const selectedAnchorOffset = currentSelection.getAnchorOffset();
      const selectedFocusOffset = currentSelection.getFocusOffset();
      const pastedTextLength = pastedText.length;

      const isTextPastedOverSelectedWords =
        currentContent.hasText() && pastedTextLength + currentContentLength >= MAX_CHAT_CHARACTERS;

      const isTextPastedOnEmptyEditor = !currentContent.hasText() && pastedTextLength >= MAX_CHAT_CHARACTERS;

      const blockSelection = SelectionState.createEmpty(currentSelection.getAnchorKey()).merge({
        anchorOffset: selectedAnchorOffset,
        focusOffset: selectedFocusOffset,
      });

      // to handle scenario where the users pasted text into selected text non-empty chat box
      if (isTextPastedOverSelectedWords) {
        return onReplaceSelectedText(currentContent, pastedText, latestEditorState, blockSelection);
      }

      // to handle scenario where the users pasted text into empty chat box
      if (isTextPastedOnEmptyEditor) {
        return onTextPastedOnEmptyEditor(currentContent, pastedText, latestEditorState, blockSelection);
      }

      return 'not-handled';
    };

    /**
     * Workflow:
     * - Slice the pasted text if the length is greater than the limit
     * - Insert the sliced text
     * - Move the cursor to end of new text
     * - Update states
     * @param currentContent
     * @param pastedText
     * @param latestEditorState
     * @param blockSelection
     * @returns
     */
    const onTextPastedOnEmptyEditor = (
      currentContent: ContentState,
      pastedText: string,
      latestEditorState: EditorState,
      blockSelection: SelectionState,
    ): DraftHandleValue => {
      const newText = pastedText.slice(0, MAX_CHAT_CHARACTERS);

      let nextEditorState = EditorState.push(
        latestEditorState,
        Modifier.insertText(currentContent, blockSelection, newText),
        'insert-characters',
      );
      nextEditorState = EditorState.moveFocusToEnd(nextEditorState);
      const nextRawValue = getRawValue(nextEditorState);
      setEditorState(nextEditorState);
      setRawValue(nextRawValue);
      onChange(nextRawValue);
      return 'handled';
    };

    const getSelectedTextLength = (latestEditorState: EditorState) => {
      const currentContent = latestEditorState.getCurrentContent();
      const currentSelection = latestEditorState.getSelection();
      const selectedAnchorOffset = currentSelection.getAnchorOffset();
      const selectedFocusOffset = currentSelection.getFocusOffset();
      const currentContentPlainText = currentContent.getPlainText();
      const selectedText = currentContentPlainText.slice(selectedAnchorOffset, selectedFocusOffset);
      return selectedText.length;
    };

    /**
     * Workflow:
     * - Slice the pasted text if there is enough space
     * - Replace the selected text with the sliced text
     * - Move the cursor to end of new text
     * - Update states
     * @param currentContent
     * @param pastedText
     * @param latestEditorState
     * @param blockSelection
     * @returns
     */
    const onReplaceSelectedText = (
      currentContent: ContentState,
      pastedText: string,
      latestEditorState: EditorState,
      blockSelection: SelectionState,
    ): DraftHandleValue => {
      const currentContentLength = currentContent.getPlainText().length;
      const currentSelection = latestEditorState.getSelection();
      const selectedFocusOffset = currentSelection.getFocusOffset();
      const pastedTextLength = pastedText.length;
      const selectedTextLength = getSelectedTextLength(latestEditorState);
      const offset = MAX_CHAT_CHARACTERS - currentContentLength + selectedTextLength;
      const redactedText = selectedTextLength > pastedTextLength ? pastedText : pastedText.slice(0, offset);

      let nextEditorState = EditorState.push(
        latestEditorState,
        Modifier.replaceText(currentContent, blockSelection, redactedText),
        'insert-characters',
      );

      nextEditorState = moveSelectionTo(
        nextEditorState,
        selectedFocusOffset + redactedText.length - selectedTextLength,
      );
      const nextRawValue = getRawValue(nextEditorState);
      setEditorState(nextEditorState);
      setRawValue(nextRawValue);
      onChange(nextRawValue);

      return 'handled';
    };

    return (
      <Box className={className} flexGrow={1} onClick={handleEditorClick}>
        <Editor
          ref={ref}
          plugins={plugins}
          editorKey={id || `${name}-id`}
          editorState={editorState}
          placeholder={placeholder || t('input.message.placeholder')}
          onChange={handleChange}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
          {...rest}
        />
        {children}
      </Box>
    );
  },
);

MessageTextarea.displayName = 'MessageTextarea';
