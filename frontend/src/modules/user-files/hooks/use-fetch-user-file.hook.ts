import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { fetchFileAction } from 'modules/user-files/actions';
import { useDispatch } from 'react-redux';

export interface UseGetUserFileInterface {
  fetchUserFile: (id: string) => void;
}

export const useFetchUserFile = (): UseGetUserFileInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserFile = (fileId: string) => {
    void dispatch(
      fetchFileAction({
        query: gql`
          query ($fileId: ID!) {
            file(fileId: $fileId) {
              id
              name
              url
              isPublic
            }
          }
        `,
        variables: {
          fileId,
        },
        context: { service: 'platform' },
      }),
    );
  };

  return {
    fetchUserFile,
  };
};
