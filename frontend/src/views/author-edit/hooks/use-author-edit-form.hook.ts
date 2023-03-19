import { AuthorInterface } from 'modules/example/interfaces';
import { useEffect } from 'react';
import { useAuthorEdit } from 'views/author-edit/hooks/use-author-edit.hook';
import { useAuthorFetch } from 'views/author-edit/hooks/use-author-fetch.hook';
import { AuthorEditFormValuesInterface } from 'views/author-edit/interfaces';

interface UseAuthorEditFormInterface {
  isLoading: boolean;
  author: AuthorInterface | null;
  error: Error;
  initialValues: AuthorEditFormValuesInterface;
  handleAuthorEditForm: (response: AuthorEditFormValuesInterface) => void;
}

export const useAuthorEditForm = (id: string): UseAuthorEditFormInterface => {
  const { handleAuthorEdit } = useAuthorEdit();
  const { handleAuthorFetch, author, ...authorFetchState } = useAuthorFetch();

  const handleAuthorEditForm = async (formValues: AuthorEditFormValuesInterface) => {
    const variables = { ...formValues };
    variables.birthDate = variables.birthDate ? new Date(variables.birthDate).toISOString() : undefined;
    return handleAuthorEdit(variables, id);
  };

  const initialValues: AuthorEditFormValuesInterface = {
    name: author?.name,
    surname: author?.surname,
    age: author?.age,
    email: author?.email,
    gender: author?.gender,
    address: author?.address || {},
    birthDate: author?.birthDate ? new Date(author.birthDate).toDateString() : '',
  };

  useEffect(() => {
    handleAuthorFetch(id);
  }, []);

  return {
    ...authorFetchState,
    author,
    initialValues,
    handleAuthorEditForm,
  };
};
