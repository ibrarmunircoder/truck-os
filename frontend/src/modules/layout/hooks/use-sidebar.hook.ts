import { closeSidebar, openSidebar } from 'modules/layout/layout.slice';
import { sidebarOpenSelector } from 'modules/layout/selectors';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface UseSidebarInterface {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useSidebar = (): UseSidebarInterface => {
  const isOpen = useSelector(sidebarOpenSelector);
  const dispatch = useDispatch();

  const handleOpen = useCallback(async () => {
    await dispatch(openSidebar());
  }, [dispatch]);

  const handleClose = useCallback(async () => {
    await dispatch(closeSidebar());
  }, [dispatch]);

  return {
    open: handleOpen,
    close: handleClose,
    isOpen,
  };
};
