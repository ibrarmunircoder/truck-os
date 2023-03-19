import { Request } from 'express';
import { UserEntity } from 'src/user/entities';

export interface AuthenticatedRequestInterface extends Request {
  user: UserEntity;
}
