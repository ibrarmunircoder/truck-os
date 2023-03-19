import { DocumentNode } from '@apollo/client';
import axios from 'axios';
import { apolloClient } from 'configuration/apollo/apollo-client';
import { ClientValidationError } from 'modules/common/errors';
import { getFileType } from 'modules/file/utils';

type onProgressCallbackInterface = (val: number) => void;

interface UploadResultInterface {
  url: string;
  fileId: string;
}

interface SetReadyStatusInterface {
  saveFileMutationOptions: {
    mutation: DocumentNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables?: Record<string, any>;
    mutationName?: string;
  };
  onSuccess?: (data) => void;
  onError?: (e: Error) => void;
}

interface FileDataInterface {
  uploadUrl: string;
}

interface FileUploadResponse {
  url: string;
  fileId: string;
}

interface InitiateFileUploadArgsInterface extends SetReadyStatusInterface {
  createStorageUrlMutationOptions: {
    mutation: DocumentNode;
    variables: Record<string, unknown>;
    mutationName: string;
  };
  onBeforeStart?: (abortController: AbortController) => void;
  onAfterStart?: (data: FileDataInterface) => void;
  onProgress?: (val: number) => void;
  selectedFile: File;
  failedFileData?: FileDataInterface;
}

interface UploadToCloudArgsInterface {
  uploadUrl: string;
  onProgress?: onProgressCallbackInterface;
  selectedFile: File;
}

interface FileUploaderInterface {
  initiateFileUpload(args: InitiateFileUploadArgsInterface): Promise<UploadResultInterface>;

  uploadToCloud(args: UploadToCloudArgsInterface): Promise<UploadResultInterface>;

  cancelCloudUpload(): void;
}

export class FileUploaderS3 implements FileUploaderInterface {
  abortController: AbortController;
  fileId: string;
  file: File;

  constructor() {
    this.abortController = new AbortController();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadToCloud(args: UploadToCloudArgsInterface): any {
    const { uploadUrl, onProgress, selectedFile } = args;

    return axios.put(uploadUrl, selectedFile, {
      method: 'PUT',
      headers: {
        'Content-Type': getFileType(selectedFile),
      },
      onUploadProgress: (progress) => {
        if (onProgress) {
          onProgress((progress.loaded / progress.total) * 100);
        }
      },
      signal: this.abortController.signal,
    });
  }

  cancelCloudUpload(): void {
    this.abortController.abort();
  }

  async setReadyStatus({ saveFileMutationOptions, onSuccess, onError }: SetReadyStatusInterface): Promise<string> {
    try {
      const result = await apolloClient().mutate({
        mutation: saveFileMutationOptions.mutation,
        variables: saveFileMutationOptions.variables,
      });

      if (onSuccess) onSuccess(result?.data);

      return result?.data[saveFileMutationOptions.mutationName];
    } catch (e) {
      if (onError) onError(e);
    }
  }

  parseHeadersParams(
    uploadUrl: string,
  ): {
    expiryTime: number;
  } {
    const url = new URL(uploadUrl);
    const expires = url.searchParams.get('Expires');
    const expiryTime = new Date().getTime() + parseInt(expires, 10);

    return {
      expiryTime,
    };
  }

  validateFileUpload(data: FileDataInterface): void {
    const { uploadUrl } = data;
    if (!uploadUrl) {
      throw new ClientValidationError({ message: 'upload-url-missing' });
    }

    const { expiryTime } = this.parseHeadersParams(uploadUrl);
    if (expiryTime < new Date().getTime()) {
      throw new ClientValidationError({
        message: 'upload-failure',
        variables: { context: 'upload-url-expired', replace: { expiryTime } },
      });
    }
  }

  async processFileUpload(options: InitiateFileUploadArgsInterface): Promise<FileUploadResponse> {
    const {
      createStorageUrlMutationOptions,
      saveFileMutationOptions,
      onBeforeStart,
      onAfterStart,
      onProgress,
      onSuccess,
      onError,
      selectedFile,
      failedFileData,
    } = options;
    if (onBeforeStart) onBeforeStart(this.abortController);

    let result;

    if (failedFileData?.uploadUrl) {
      result = failedFileData;
    } else {
      const { data } = await apolloClient().mutate({
        mutation: createStorageUrlMutationOptions.mutation,
        variables: createStorageUrlMutationOptions.variables,
      });

      result = data[createStorageUrlMutationOptions.mutationName];
    }

    if (onAfterStart) onAfterStart(result);
    this.validateFileUpload({
      uploadUrl: result,
    });
    await this.uploadToCloud({
      uploadUrl: result,
      onProgress,
      selectedFile,
    });

    await this.setReadyStatus({
      saveFileMutationOptions,
      onSuccess,
      onError,
    });
    return result;
  }

  async initiateFileUpload(options: InitiateFileUploadArgsInterface): Promise<FileUploadResponse> {
    try {
      return await this.processFileUpload(options);
    } catch (e) {
      if (options.onError) options.onError(e);
      console.error(e);
    }
  }
}
