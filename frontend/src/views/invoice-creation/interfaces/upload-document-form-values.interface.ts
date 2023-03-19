interface FileInterface {
    id: string;
    type: string;
    message: string;
  }

export interface UploadDocumentFormValuesInterface {
    invoice: FileInterface,
    pod: FileInterface,
}
