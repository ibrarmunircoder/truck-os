export interface BookCreateFormValuesInterface {
  title?: string;
  description?: string;
  price?: number;
  publishingDate?: string;
  published?: boolean;
  outOfStock?: boolean;
  authorId?: string;
  files: File[];
}
