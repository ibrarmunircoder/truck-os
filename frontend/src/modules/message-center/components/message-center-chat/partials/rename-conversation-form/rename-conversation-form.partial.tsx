import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import _noop from 'lodash/noop';
import { useTranslation } from 'modules/common/hooks';
import { useRenameConversationFormSchema } from 'modules/message-center/hooks';
import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  useLayoutEffect,
  useState
} from 'react';

export interface RenameConversationFormValuesInterface {
  title: string;
}

export interface RenameConversationFormInterface extends Omit<HTMLAttributes<HTMLElement>, 'onSubmit'> {
  defaultTitle?: string;
  onSubmit: (formValues: RenameConversationFormValuesInterface) => void;
  onCancel: () => void;
}

const doFocus = (htmlElRef: HTMLElement, id: string) => {
  window.requestAnimationFrame(() => {
    if (!htmlElRef) return
    const input = htmlElRef.querySelector<HTMLElement>(`#${id}`)
    if (input) input.focus()
  });
}

export const RenameConversationFormPartial: FunctionComponent<RenameConversationFormInterface> = (
  {
    defaultTitle,
    onSubmit = _noop,
    onCancel = _noop,
    ...rest
  }) => {
  const { t } = useTranslation();
  const [titleField, setTitleField] = useState<HTMLElement>(null);

  const { handleSubmit, handleChange, values, setFieldValue, handleBlur } = useFormik({
    initialValues: {
      title: defaultTitle || '',
    },
    onSubmit,
    validationSchema: useRenameConversationFormSchema(),
  });

  const handleMouseDown: MouseEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
  }

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  }

  useLayoutEffect(() => {
    doFocus(titleField, 'title');
  }, [titleField])

  return (
    <form
      onSubmit={handleSubmit}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      {...rest}
    >
      <TextField
        name="title"
        id="title"
        value={values.title}
        type="text"
        label={t('input.group-title.placeholder')}
        onChange={handleChange}
        onReset={() => setFieldValue('title', '')}
        onBlur={handleBlur}
        ref={setTitleField}
        fullWidth
      />
    </form>
  );
};
