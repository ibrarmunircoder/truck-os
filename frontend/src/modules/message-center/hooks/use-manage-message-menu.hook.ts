import { useState } from 'react';

export interface UseManageMessageMenuHookInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useManageMessageMenu = (): UseManageMessageMenuHookInterface => { 
  const [isOpen, setOpen] = useState(false)

  const open = () => {
    setOpen(true)
  }
  
  const close = () => {
    setOpen(false)
  }
  
  return {
    isOpen,
    open,
    close,
  }
};