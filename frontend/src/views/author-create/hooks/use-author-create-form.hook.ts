import { FormikHelpers } from 'formik';
import { useAuthorCreate } from 'views/author-create/hooks/use-author-create.hook';
import { AuthorCreateFormValuesInterface } from 'views/author-create/interfaces';

interface UseAuthorCreateFormInterface {
  handleAuthorCreateForm: (
    response: AuthorCreateFormValuesInterface,
    formikHelper: FormikHelpers<AuthorCreateFormValuesInterface>,
  ) => void;
}

export const useAuthorCreateForm = (): UseAuthorCreateFormInterface => {
  const { handleAuthorCreate } = useAuthorCreate();
  const handleAuthorCreateForm = async (
    formValues: AuthorCreateFormValuesInterface,
    { resetForm }: FormikHelpers<AuthorCreateFormValuesInterface>,
  ) => {
    const variables = { ...formValues };
    variables.birthDate = variables.birthDate ? new Date(variables.birthDate).toISOString() : undefined;
    const result = handleAuthorCreate(variables);

    resetForm();
    return result;
  };

  return {
    handleAuthorCreateForm,
  };
};
