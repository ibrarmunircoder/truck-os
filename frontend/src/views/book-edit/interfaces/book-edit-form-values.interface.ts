import { FileInterface } from 'modules/common/interfaces';

export interface BookEditFormValuesInterface {
  title?: string;
  description?: string;
  price?: number;
  publishingDate?: string;
  published?: boolean;
  outOfStock?: boolean;
  authorId?: string;
  files: (File | FileInterface)[];
  newFiles: File[];
  removedFiles: FileInterface[];
}
