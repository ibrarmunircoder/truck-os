import { OrderEnum } from 'modules/common/enums';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import { UsersSortEnum } from 'modules/users/enums';
import { useFetchUsers } from 'modules/users/hooks';
import { userListSelector } from 'modules/users/selectors';
import { UserListStateInterface } from 'modules/users/users.slice';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface UseUsersTableInterface extends UserListStateInterface, UserStateInterface {
  handlePageChange: (newPage: number, pageSize: number) => void;
  handlePageRowsCountChange: (rowsCount: number) => void;
  handleOrderChange: (sort: UsersSortEnum, order: OrderEnum) => void;
}

interface UserStateInterface {
  pageNumber: number;
  pageSize: number;
  order: { sort: UsersSortEnum; order: OrderEnum };
}

export const useUsersTable = (userFilter: UserTableToggleButtonGroupEnum): UseUsersTableInterface => {
  const { fetchUsers } = useFetchUsers();
  const userList = useSelector(userListSelector);
  const [tableState, setTableState] = useState<UserStateInterface>({
    pageNumber: 0,
    pageSize: 10,
    order: { sort: UsersSortEnum.CREATED_AT, order: OrderEnum.ASC },
  });

  const { pageNumber, pageSize, order } = tableState;
  const { searchTerm, userSearchBy } = userList;

  useEffect(() => {
    if (userFilter) {
      fetchUsers({
        offset: pageNumber * pageSize,
        limit: pageSize,
        order,
        filter: {
          active: {
            equalTo: userFilter === UserTableToggleButtonGroupEnum.ACTIVE ? true : false,
          },
          ...(searchTerm ? { [userSearchBy]: { iLike: `${searchTerm}%` } } : {}),
        },
      });
    }
  }, [pageNumber, pageSize, order, searchTerm, userSearchBy, userFilter]);

  const handleOrderChange = useCallback(
    (sort: UsersSortEnum, orderDirection: OrderEnum) => {
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
    (rowsCount: number) => {
      setTableState((ts) => ({
        ...ts,
        pageSize: rowsCount,
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
    ...userList,
    pageNumber,
    pageSize,
    order,
    handlePageChange,
    handlePageRowsCountChange,
    handleOrderChange,
  };
};
