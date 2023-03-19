import { FileUploadStatusEnum } from 'modules/file/enums';

export interface FileInterface {
  id: string;
  status: FileUploadStatusEnum;
  name: string;
  customMetaData: Record<string, unknown>;
  contentType: string;
  createdAt?: Date;
  updatedAt?: Date;
  url?: string;
  uploadUrl?: string;
  isPublic: boolean;
}
