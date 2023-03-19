import { gql } from '@apollo/client'
import { AppDispatch } from 'configuration/redux/store'
import { updateAuthUserAction } from 'modules/auth/auth.slice';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { FileUploader, getFileType } from 'modules/file/utils'
import { updateUserAction } from 'modules/users/slices';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

interface AvatarUpdateInterface {
  file: File;
  onProgress?: (val: number) => void;
}

export interface UseAvatarUpdateHookInterface {
  handleAvatarFileChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  uploadAvatar: () => void;
  uploadFile: (
    args: AvatarUpdateInterface
  ) => Promise<{ url: string, fileId: string }>,
  avatarFile: File;
  setAvatarFile: (data: File) => void;
}

export const useAvatarUpdate = (userId: string): UseAvatarUpdateHookInterface => {
  const { user: authUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [avatarFile, setAvatarFile] = useState<File>(null)

  const createSaveFileMutationOptions = (
    file: File,
  ) => ({
    mutation: gql`mutation updateUserAvatar(
      $fileName:String!,
      $fileType:String!,
    ) {
      updateUserAvatar(data:{
        fileName:$fileName
        fileType:$fileType
      }) {
        id
        uploadUrl
        contentType
      }
    }
    `,
    variables: {
      fileName: file.name,
      fileType: getFileType(file),
    },
    mutationName: 'updateUserAvatar'
  });

  const createUpdateFileStatusMutationOptions = () => ({
    mutation: gql`
      mutation updateFileStatus($fileId: ID!, $status: FileStatusEnum!) {
        updateFileStatus(fileId: $fileId, status: $status) {
          url
        }
      }
    `,
    mutationName: 'updateFileStatus'
  })

  const uploadFile = ({
    file,
    onProgress,
  }: AvatarUpdateInterface): Promise<{ url: string, fileId: string }> =>
    new FileUploader()
      .initiateFileUpload(
        {
          selectedFile: file,
          saveFileMutationOptions: createSaveFileMutationOptions(file),
          fileStatusUpdateMutationOptions: createUpdateFileStatusMutationOptions(),
          onError: (e) => {
            throw e;
          },
          onProgress,
          onSuccess: (data) => {
            const url = data?.updateFileStatus.url;
            dispatch(updateUserAction({
              id: userId,
              avatar: url,
            }));

            if (authUser.id === userId) {
              dispatch(updateAuthUserAction({ avatar: url }));
            }
          },
        }
      )

  const handleAvatarFileChange = (evt?: ChangeEvent<HTMLInputElement>) => {
    const file = evt?.target?.files[0];
    if (!file){
      setAvatarFile(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarFile(file);
    }
    reader.readAsDataURL(file);
  }

  const uploadAvatar = async () => {
    if (!avatarFile) throw new Error(t('upload.failure.avatar'));
    await uploadFile({
      file: avatarFile,
    });
    setAvatarFile(null);
  }


  return {
    uploadFile,
    uploadAvatar,
    handleAvatarFileChange,
    avatarFile,
    setAvatarFile
  }
}
