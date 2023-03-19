import { OrderEnum } from 'modules/common/enums';
import { UserInviteSortEnum, UserInviteStatusEnum } from 'modules/user-invites/enums';
import { useFetchUserInvites } from 'modules/user-invites/hooks';
import { userInviteListSelector } from 'modules/user-invites/selectors';
import { UserInviteListStateInterface } from 'modules/user-invites/user-invites.slice';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface UseUserInvitesTableInterface extends UserInviteListStateInterface, UserInviteTableStateInterface {
  handlePageChange: (newPage: number, pageSize?: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleOrderChange: (sort: UserInviteSortEnum, order: OrderEnum) => void;
}

export interface UserInviteTableStateInterface {
  pageNumber: number;
  pageSize: number;
  order: {
    sort: UserInviteSortEnum;
    order: OrderEnum;
  };
}

export const useUserInvitesTable = (
  userFilter: UserTableToggleButtonGroupEnum,
  selectedUserInviteId: string,
): UseUserInvitesTableInterface => {
  const [tableState, setTableState] = useState<UserInviteTableStateInterface>({
    pageNumber: 0,
    pageSize: 20,
    order: { sort: UserInviteSortEnum.CREATED_AT, order: OrderEnum.DESC },
  });
  const { pageNumber, pageSize, order } = tableState;
  const { fetchUserInvites } = useFetchUserInvites();
  const userInviteList = useSelector(userInviteListSelector);

  useEffect(() => {
    if (selectedUserInviteId === null) {
      const filter =
        userFilter === UserTableToggleButtonGroupEnum.INVITED
          ? {
            status: {
              valueIn: [
                UserInviteStatusEnum.PENDING.toLocaleLowerCase(),
                UserInviteStatusEnum.ACCEPTED.toLocaleLowerCase(),
              ],
            },
          }
          : {
            status: {
              valueIn: [
                UserInviteStatusEnum.CANCELED.toLocaleLowerCase(),
                UserInviteStatusEnum.EXPIRED.toLocaleLowerCase(),
              ],
            },
          };

      fetchUserInvites({
        offset: pageNumber * pageSize,
        limit: pageSize,
        order,
        filter,
      });
    }
  }, [pageNumber, pageSize, order, userFilter]);

  const handleOrderChange = useCallback(
    (sort: UserInviteSortEnum, orderDirection: OrderEnum) => {
      setTableState((ts) => ({
        ...ts,
        order: {
          sort,
          order: orderDirection,
        },
      }));
    },
    [setTableState],
  );

  const handlePageRowsCountChange = useCallback(
    (newPageSize: number) => {
      setTableState((ts) => ({
        ...ts,
        pageSize: newPageSize,
      }));
    },
    [setTableState],
  );

  const handlePageChange = useCallback(
    (newPageNumber: number, newPageSize: number) => {
      setTableState((ts) => ({
        ...ts,
        pageNumber: newPageNumber,
        pageSize: newPageSize,
      }));
    },
    [setTableState],
  );

  return {
    ...userInviteList,
    pageNumber,
    pageSize,
    order,
    handlePageChange,
    handlePageSizeChange: handlePageRowsCountChange,
    handleOrderChange,
  };
};