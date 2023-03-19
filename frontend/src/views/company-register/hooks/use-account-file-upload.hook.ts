import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { addAccountDocument, resetError } from 'modules/company-register/company-register.slice';
import { accountRegisterSelector } from 'modules/company-register/selectors/account-register.selector';
import { FileUploaderS3 } from 'modules/file/utils';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountFileEnum } from 'views/company-register/enum';
import { useDeleteAccountFiles } from 'views/company-register/hooks';
import { companyDocumentUploadFormModel } from 'views/company-register/utils';

interface UploadAccountFileInterface {
  file: File;
  temporaryId?: string;
  failedFileData?: {
    id: string;
    contentType: string;
    uploadUrl: string;
  };
}

interface UploadStatusInterface {
  type: string;
  message: string;
}

interface FileInterface {
  id: string;
  name: string;
}

interface AccountFileCreatePayload {
  key: string;
  fileCategory: string;
  name: string;
  contentType: string;
  accountId: string;
}

interface UseAccountFileUploadHookInterface {
  handleFileUpload: (files: File[]) => void;
  handleFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleResetError: () => void;
  resetStatusError: () => void;
  isUploading: boolean;
  uploadStatus: UploadStatusInterface;
  error: null;
}

const createFileStorageUrlMutationOptions = (key: string) => ({
  mutation: gql`
    mutation createStorageUrl($key: String!) {
      createStorageUrl(key: $key)
    }
  `,
  variables: {
    key,
  },
  mutationName: 'createStorageUrl',
});

const createUpdateFileStatusMutationOptions = (data: AccountFileCreatePayload) => ({
  mutation: gql`
    mutation saveAccountFile($data: AccountFileCreateDto!) {
      saveAccountFile(data: $data) {
        id
        name
      }
    }
  `,
  variables: { data },
  mutationName: 'saveAccountFile',
});

const { companyDocument } = companyDocumentUploadFormModel.formField;

export const useAccountFileUpload = (): UseAccountFileUploadHookInterface => {
  const { user } = useAuth();
  const { account, error } = useSelector(accountRegisterSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const { deleteFiles } = useDeleteAccountFiles();
  const { t } = useTranslation();

  const resetStatusError = () => {
    setUploadStatus(null);
  };

  const upload = ({ file, failedFileData }: UploadAccountFileInterface): Promise<{ url: string; fileId: string }> => {
    const key = `${user.id}/${account.id}/${Date.now()}-${file.name}`;
    return new FileUploaderS3().initiateFileUpload({
      selectedFile: file,
      createStorageUrlMutationOptions: createFileStorageUrlMutationOptions(key),
      saveFileMutationOptions: createUpdateFileStatusMutationOptions({
        key,
        fileCategory: AccountFileEnum.TRADE_REGISTRATION,
        name: file.name,
        contentType: file.type,
        accountId: account.id as string,
      }),
      onError: (uploadError) => {
        setIsUploading(false);
        setUploadStatus({
          type: 'error',
          message:
            file.type !== 'application/pdf'
              ? new Error(t('company-register.file-type-error')).message
              : uploadError?.message,
        });
      },
      onBeforeStart: () => setIsUploading(true),
      onSuccess: (data) => {
        setIsUploading(false);
        setUploadStatus({
          type: 'success',
          message: t('company-register.step2.document-uploader-sub-title-success'),
        });
        dispatch(
          addAccountDocument({
            file: {
              ...data.saveAccountFile,
            },
          }),
        );
      },
      failedFileData,
    });
  };

  const uploadFile = async (file) => {
    const userId = user.id;
    if (!userId || !file) return;

    await upload({
      file,
    });
  };

  const handleClose = () => setIsUploading(false);

  const handleFileUpload = (files: File[]) => {
    files.forEach((file: File) => {
      void uploadFile(file);
    });
  };

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const accountFiles: FileInterface[] = account[companyDocument.name] as [];
    try {
      if (accountFiles.length > 0) {
        if (event.target.files[0].type === 'application/pdf') {
          await deleteFiles({
            id: { valueIn: accountFiles.map((file) => file.id) },
          });
        }
      }
      const uploadedFiles: FileList = event.target.files;
      handleFileUpload(Array.from(uploadedFiles));
      event.target.value = '';
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err?.message,
      });
    }
  };

  const handleResetError = useCallback(() => dispatch(resetError()), [dispatch]);

  return {
    handleFileUpload,
    handleFileSelected,
    isUploading,
    handleClose,
    handleResetError,
    error,
    uploadStatus,
    resetStatusError,
  };
};
