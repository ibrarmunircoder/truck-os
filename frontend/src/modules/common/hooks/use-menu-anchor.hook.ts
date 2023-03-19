import { SyntheticEvent, useCallback, useState } from 'react';

export const useMenuAnchor = (): [ HTMLElement, (event: SyntheticEvent) => void, () => void ] => {
  const [anchorEl, setAnchorEl] = useState(null);
  const onOpen = useCallback(({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }, [])
  const onClose = useCallback(() => setAnchorEl(null), [])

  return [
    anchorEl,
    onOpen,
    onClose,
  ]
};
