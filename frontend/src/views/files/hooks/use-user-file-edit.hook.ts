import { useFetchUserFile } from 'modules/user-files/hooks';
import { FileInterface } from 'modules/user-files/interfaces';
import { singleUserFileSelector } from 'modules/user-files/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export interface UserUserFileEditInterface {
  file: FileInterface | null;
  isLoading: boolean;
  error: Error | null;
}

export const useUserFileEdit = (id: string): UserUserFileEditInterface => {
  const { fetchUserFile } = useFetchUserFile();
  const { file, isLoading, error } = useSelector(singleUserFileSelector)

  useEffect(() => {
    if (id) {
      fetchUserFile(id)
    }
  }, [id])

  return {
    file: file?.id === id ? file : null,
    isLoading,
    error,
  };
};
