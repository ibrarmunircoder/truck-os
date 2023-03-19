import { BookInterface } from 'modules/example/interfaces';
import { useEffect } from 'react';
import { useBookEdit, useBookEditFileHandler, useBookFetch } from 'views/book-edit/hooks';
import { BookEditFormValuesInterface } from 'views/book-edit/interfaces';

interface UseBookEditFormInterface {
  isLoading: boolean;
  book: BookInterface | null;
  error: Error;
  initialValues: BookEditFormValuesInterface;
  handleBookEditForm: (response: BookEditFormValuesInterface) => void;
}

export const useBookEditForm = (id: string): UseBookEditFormInterface => {
  const { handleBookEdit } = useBookEdit();
  const { handleBookFetch, book, ...bookFetchState } = useBookFetch();
  const { uploadFile, deleteFiles } = useBookEditFileHandler();

  const handleBookEditForm = async (formValues: BookEditFormValuesInterface) => {
    const { newFiles, removedFiles, ...variables } = formValues;
    delete variables.files;
    variables.publishingDate = variables.publishingDate ? new Date(variables.publishingDate).toISOString() : undefined;

    if (removedFiles.length) {
      await deleteFiles(removedFiles.map((rf) => rf.id));
    }

    for (const file of newFiles) {
      await uploadFile(file, id);
    }

    return handleBookEdit(variables, id);
  };

  const initialValues: BookEditFormValuesInterface = {
    title: book?.title,
    description: book?.description,
    price: book?.price,
    authorId: book?.authorId,
    published: book?.published,
    outOfStock: book?.outOfStock,
    publishingDate: book?.publishingDate ? new Date(book.publishingDate).toDateString() : '',
    files: book?.bookFiles || [],
    newFiles: [],
    removedFiles: [],
  };

  useEffect(() => {
    handleBookFetch(id);
  }, []);

  return {
    ...bookFetchState,
    book,
    initialValues,
    handleBookEditForm,
  };
};
