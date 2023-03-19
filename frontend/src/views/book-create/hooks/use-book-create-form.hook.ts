import { FormikHelpers } from 'formik';
import { useBookCreate, useBookCreateFileUploader } from 'views/book-create/hooks';
import { BookCreateFormValuesInterface } from 'views/book-create/interfaces';

interface UseBookCreateFormInterface {
  handleBookCreateForm: (
    response: BookCreateFormValuesInterface,
    FormikHelpers: FormikHelpers<BookCreateFormValuesInterface>,
  ) => void;
}

export const useBookCreateForm = (): UseBookCreateFormInterface => {
  const { handleBookCreate } = useBookCreate();
  const { uploadFile } = useBookCreateFileUploader();

  const handleBookCreateForm = async (
    formValues: BookCreateFormValuesInterface,
    { resetForm }: FormikHelpers<BookCreateFormValuesInterface>,
  ) => {
    const { files, ...variables } = formValues;
    variables.publishingDate = variables.publishingDate ? new Date(variables.publishingDate).toISOString() : undefined;
    const bookId = await handleBookCreate(variables);

    files.forEach((file) => {
      void uploadFile(file, bookId);
    });

    resetForm();
    return bookId;
  };

  return {
    handleBookCreateForm,
  };
};
