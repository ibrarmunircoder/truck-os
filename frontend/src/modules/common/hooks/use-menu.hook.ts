import { useState } from "react";

export interface UseMenuHookInterface {
  anchorElement: Element;
  setAnchorElement: (element: Element) => void;
  onClose: () => void;
}

export const useMenu = (): UseMenuHookInterface => {
  const [anchorElement, setAnchorElement] = useState(null);

  const onClose = () => {
    setAnchorElement(null);
  };

  return {
    anchorElement,
    setAnchorElement,
    onClose,
  }
};
