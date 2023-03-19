import axios from 'axios';
import { useAuth } from 'modules/auth/hooks';
import { useCallback } from 'react';

interface UseInvoiceDocumentsHookInterface {
  handleDownload: (url: string, name: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleEmailOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const useInvoiceDocuments = (): UseInvoiceDocumentsHookInterface => {
  const { user } = useAuth();
  const handleDownload = useCallback(
    (url: string, name: string) => async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      if (url) {
        const blob = await axios.get(url, {
          responseType: 'blob',
        });
        const blobURL = URL.createObjectURL(blob.data);
        const anchor = document.createElement('a');
        anchor.href = blobURL;
        anchor.download = name;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
    },
    [],
  );

  const handleEmailOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      const anchor = document.createElement('a');
      anchor.href = `mailto:${user.email}`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    },
    [user],
  );

  return {
    handleDownload,
    handleEmailOpen,
  };
};
