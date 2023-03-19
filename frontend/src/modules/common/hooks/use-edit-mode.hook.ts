import { useCallback, useState } from 'react';

export interface UseEditModeInterface {
  editMode: boolean;
  switchToEditMode: () => void;
  switchToViewMode: () => void;
  toggleEditMode: () => void;
  setEditMode: (editMode: boolean) => void;
}

export const useEditMode = (): UseEditModeInterface => {
  const [editMode, setEditMode] = useState(false);

  const switchToEditMode = useCallback(() => setEditMode(true), [ setEditMode ]);
  const switchToViewMode = useCallback(() => setEditMode(false), [ setEditMode ]);
  const toggleEditMode = useCallback(() => setEditMode(v => !v), [ setEditMode ]);

  return {
    editMode,
    switchToEditMode,
    switchToViewMode,
    toggleEditMode,
    setEditMode,
  };
}
