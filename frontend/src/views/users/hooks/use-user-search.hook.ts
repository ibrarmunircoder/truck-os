/* eslint-disable @roq/lodash-destructuring-import-is-not-allowed */
import { SelectChangeEvent } from '@mui/material/Select';
import { AppDispatch } from 'configuration/redux/store';
import { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';
import { UserFilterEnum } from 'modules/users/enums';
import { userListSelector } from 'modules/users/selectors';
import { setSearchTermAction, setUserSearchByAction } from 'modules/users/slices';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

interface UseUserSearchHookInterface {
  handleSearchByOnChange: (event: SelectChangeEvent<string>) => void;
  userSearchBy: UserFilterEnum;
  handleSearchOnChange: () => DebouncedFunc<(event: React.ChangeEvent<HTMLInputElement>) => void>;
  searchByOptions: {
    label: string;
    value: string;
    id: string;
  }[];
  searchTerm: string;
}

export const useUserSearch = (): UseUserSearchHookInterface => {
  const { users, userSearchBy, searchTerm } = useSelector(userListSelector);
  const dispatch = useDispatch<AppDispatch>();

  const searchByOptions = useMemo(
    () => [
      { label: 'First Name', value: UserFilterEnum.FIRST_NAME, id: uuidV4() },
      { label: 'Last Name', value: UserFilterEnum.LAST_NAME, id: uuidV4() },
    ],
    [],
  );

  const handleSearchTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      const searchTermValue = event.target.value;
      dispatch(setSearchTermAction(searchTermValue));
    },
    [users],
  );

  const handleSearchByOnChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(setUserSearchByAction(event.target.value));
    },
    [dispatch, setUserSearchByAction],
  );

  const handleSearchOnChange = useCallback(() => debounce(handleSearchTerm, 600), [handleSearchTerm]);

  return {
    handleSearchOnChange,
    searchByOptions,
    handleSearchByOnChange,
    userSearchBy,
    searchTerm,
  };
};
