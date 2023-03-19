export interface UserInitialsInterface {
  firstName?: string;
  lastName?: string;
}
export const createUserInitials = (user: UserInitialsInterface): string =>
    user?.firstName || user?.lastName ?
    `${(user?.firstName || '').charAt(0)}${(user?.lastName || '').charAt(0)}` :
      '??'
