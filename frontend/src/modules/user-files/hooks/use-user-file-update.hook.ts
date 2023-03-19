import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { updateFileAction } from 'modules/user-files/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export interface UserFileUpdateValuesInterface {
  name?: string;
}

export interface UserFileUpdateHookInterface {
  updateFile: (id: string, file: UserFileUpdateValuesInterface) => void;
}

export const useUserFileUpdate = (): UserFileUpdateHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const updateFile = useCallback(
    (id: string, updateFileDto: UserFileUpdateValuesInterface) => {
      void dispatch(
        updateFileAction({
          mutation: gql`
            mutation updateFile($id: ID!, $updateFileDto: FileUpdateDto!) {
              updateFile(fileId: $id, updateFileDto: $updateFileDto) {
                id
                name
              }
            }
          `,
          variables: { id, updateFileDto },
        }),
      );
    },
    [dispatch],
  );

  return { updateFile };
};
