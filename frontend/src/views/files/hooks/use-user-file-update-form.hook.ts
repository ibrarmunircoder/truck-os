import { getFileExtension } from 'modules/file/utils';
import { useEnhancedFormik, UseEnhancedFormikInterface } from 'modules/forms/hooks';
import { useUserFileUpdate } from 'modules/user-files/hooks';
import { FileInterface } from 'modules/user-files/interfaces';
import { useCallback, useMemo } from 'react';
import { useUserFileEditFormSchema } from 'views/files/hooks/use-user-file-edit-form-schema.hook';

export interface EditUserFormValuesInterface {
  name: string;
}

export const useUserFileUpdateForm = (file: FileInterface): UseEnhancedFormikInterface<EditUserFormValuesInterface> => {
  const { updateFile } = useUserFileUpdate();
  const fileExtension = getFileExtension(file.name);
  const fileNameWithoutExtension = file.name.replace(`.${fileExtension}`, '');

  const initialValues = useMemo(
    () => ({
      name: fileNameWithoutExtension,
    }),
    [],
  );

  const onSubmit = useCallback(
    async (formValues, actions) => {
      // the file name being rendered in text field is without extension, so before we
      // submit back the updated file name, we need to append the file extension again
      const result = await updateFile(file?.id, { name: `${formValues?.name}.${fileExtension}` });
      actions.resetForm({
        values: {
          name: formValues?.name,
        },
      });
      return result;
    },
    [file?.id, updateFile],
  );

  return useEnhancedFormik<EditUserFormValuesInterface>({
    initialValues,
    onSubmit,
    enableReinitialize: true,
    validationSchema: useUserFileEditFormSchema(),
  });
};
