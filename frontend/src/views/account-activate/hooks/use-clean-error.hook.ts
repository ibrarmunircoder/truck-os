import { AppDispatch } from 'configuration/redux/store';
import { resetAuthErrorAction } from 'modules/auth/auth.slice';
import { authSelector } from 'modules/auth/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCleanError = (): void => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(authSelector);
  const { error } = state;

  useEffect(() => {
    if (error) {
      dispatch(resetAuthErrorAction());
    }
  }, []);
};
