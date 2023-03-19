import { AuthorGenderEnum } from 'modules/example/enums';
import { BookInterface } from 'modules/example/interfaces';

export interface AuthorInterface {
  id: string;
  name?: string;
  surname?: string;
  age?: number;
  birthDate?: Date;
  email?: string;
  address?: Record<string, unknown>;
  gender?: AuthorGenderEnum;
  books: BookInterface[];
}
