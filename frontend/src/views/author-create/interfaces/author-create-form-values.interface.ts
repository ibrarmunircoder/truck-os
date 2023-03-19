import { AuthorGenderEnum } from 'modules/example/enums';

export interface AuthorCreateFormValuesInterface {
  name?: string;
  surname?: string;
  age?: number;
  birthDate?: string;
  email?: string;
  address?: Record<string, unknown>;
  gender?: AuthorGenderEnum;
}
