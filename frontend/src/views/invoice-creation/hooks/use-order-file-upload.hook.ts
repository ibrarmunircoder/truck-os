import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { accountCompanyNameSelector } from 'modules/account-id/selectors/account-company-name.selector';
import { accountVirtualBicSelector } from 'modules/account-id/selectors/account-virtual-bic.selector';
import { accountVirtualIbanSelector } from 'modules/account-id/selectors/account-virtual-iban.selector';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { FileUploaderS3 } from 'modules/file/utils';
import { addDocumnentDetails, resetError } from 'modules/invoice-creation/invoice-creation.slice';
import { invoiceCreationSelector } from 'modules/invoice-creation/selectors';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderFileUploadTypeEnum } from 'views/invoice-creation/enum';
import { useDeleteOrderFiles } from 'views/invoice-creation/hooks';
import { CustomerFormValuesInterface, UploadDocumentFormValuesInterface } from 'views/invoice-creation/interfaces';

interface UploadStatusInterface {
  type: string;
  message: string;
}

interface UseOrderFileUploadHookInterface {
  handleFileSelected: (fileCategory: OrderFileUploadTypeEnum) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  error: null;
  handleResetError: () => void;
  handleClose: () => void;
  resetStatusError: () => void;
  documentDetails: UploadDocumentFormValuesInterface;
  virtualIban: string;
  virtualBic: string;
  companyName: string;
  customerDetails: CustomerFormValuesInterface;
  uploadStatus: UploadStatusInterface;
}

interface UploadAccountFileInterface {
  file: File;
  temporaryId?: string;
  fileCategory?: OrderFileUploadTypeEnum;
  failedFileData?: {
    id: string;
    contentType: string;
    uploadUrl: string;
  };
}

interface OrderFileCreatePayload {
  key: string;
  fileCategory: string;
  name: string;
  contentType: string;
  orderId: string;
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

const createUpdateFileStatusMutationOptions = (data: OrderFileCreatePayload) => ({
  mutation: gql`
    mutation saveOrderFile($data: OrderFileCreateDto!) {
      saveOrderFile(data: $data) {
        id
        name
        fileCategory
      }
    }
  `,
  variables: { data },
  mutationName: 'saveOrderFile',
});

export const useOrderFileUpload = (): UseOrderFileUploadHookInterface => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { error, documentDetails, paymentDetails, customerDetails } = useSelector(invoiceCreationSelector);
  const virtualIban = useSelector(accountVirtualIbanSelector);
  const virtualBic = useSelector(accountVirtualBicSelector);
  const companyName = useSelector(accountCompanyNameSelector);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const { deleteFiles } = useDeleteOrderFiles();
  const { t } = useTranslation();

  const resetStatusError = () => {
    setUploadStatus(null);
  };

  const handleResetError = useCallback(() => {
    void dispatch(resetError());
  }, []);

  const upload = ({
    file,
    failedFileData,
    fileCategory,
  }: UploadAccountFileInterface): Promise<{ url: string; fileId: string }> => {
    const key = `${user.id}/${paymentDetails.id}/${Date.now()}-${file.name}`;
    return new FileUploaderS3().initiateFileUpload({
      selectedFile: file,
      createStorageUrlMutationOptions: createFileStorageUrlMutationOptions(key),
      saveFileMutationOptions: createUpdateFileStatusMutationOptions({
        key,
        fileCategory,
        name: file.name,
        contentType: file.type,
        orderId: paymentDetails.id,
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
        dispatch(
          addDocumnentDetails({
            file: data.saveOrderFile,
          }),
        );
        setUploadStatus({
          type: 'success',
          message: t('company-register.step2.document-uploader-sub-title-success'),
        });
      },
      failedFileData,
    });
  };

  const uploadFile = async (file, fileCategory: OrderFileUploadTypeEnum) => {
    const userId = user.id;
    if (!userId || !file) return;

    await upload({
      file,
      fileCategory,
    });
  };

  const handleFileUpload = (files: File[], fileCategory: OrderFileUploadTypeEnum) => {
    files.forEach((file: File) => {
      void uploadFile(file, fileCategory);
    });
  };

  const resetInputFiles = (event: React.ChangeEvent<HTMLInputElement>) => (event.target.value = '');

  const handleFileSelected = (fileCategory: OrderFileUploadTypeEnum) => async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      event.stopPropagation();
      if (documentDetails.invoice && fileCategory === OrderFileUploadTypeEnum.ORDER_FILE_INVOICE_CATEGORY) {
        if (event.target.files[0].type === 'application/pdf') {
          await deleteFiles({
            id: { valueIn: [documentDetails.invoice.id] },
          });
        }
      }
      if (documentDetails.pod && fileCategory === OrderFileUploadTypeEnum.ORDER_FILE_POD_CATEGORY) {
        if (event.target.files[0].type === 'application/pdf') {
          await deleteFiles({
            id: { valueIn: [documentDetails.pod.id] },
          });
        }
      }

      const uploadedFiles: FileList = event.target.files;
      handleFileUpload(Array.from(uploadedFiles), fileCategory);
      resetInputFiles(event);
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err?.message,
      });
    }
  };

  const handleClose = useCallback(() => setIsUploading(false), []);

  return {
    handleFileSelected,
    handleResetError,
    handleClose,
    isUploading,
    documentDetails,
    error,
    virtualIban,
    virtualBic,
    companyName,
    customerDetails,
    uploadStatus,
    resetStatusError,
  };
};
