import { FileInterface } from 'modules/common/interfaces';
import { AuthorInterface } from 'modules/example/interfaces';

export interface BookInterface {
  id: string;
  title?: string;
  publishingDate?: Date;
  price?: number;
  description?: string;
  published?: boolean;
  outOfStock?: boolean;
  bookFiles?: FileInterface[];
  authorId: string;
  author: AuthorInterface;
  createdAt: Date;
  updatedAt: Date;
}
