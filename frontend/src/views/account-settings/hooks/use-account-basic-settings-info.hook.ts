import { AppDispatch } from 'configuration/redux/store';
import { updateAccountSettingsView } from 'modules/account-settings/account-settings.slice';
import { AuthUserInterface } from 'modules/auth';
import { useAuth, useLogout } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

interface AccountConfigInterface {
  id: string;
  icon: string;
  iconAlt: string;
  title: string;
  newSettingsView: number;
}
interface AccountBasicSettingsInfoHookInterface {
  handleActionClick: (newSettingsView: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleAccountLogout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  user: AuthUserInterface;
  handleDialogClose: () => void;
  handleDialogOpen: () => void;
  handleContactUs: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  open: boolean;
  telephoneAnchorRef: React.MutableRefObject<HTMLAnchorElement>;
  accountActionsConfig: AccountConfigInterface[];
}

export const useAccountBasicSettingsInfo = (): AccountBasicSettingsInfoHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleLogout } = useLogout();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDeskTop, setIsDesktop] = useState(false);
  const telephoneAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const watcher = matchMedia('(min-width: 640px)');
    setIsDesktop(watcher.matches);
    const listener = (matches) => setIsDesktop(matches.matches);
    if (watcher.addEventListener) {
      watcher.addEventListener('change', listener);
    }
    return () => watcher.removeEventListener('change', listener);
  }, []);

  const accountActionsConfig = useMemo(
    () => [
      {
        id: uuidV4(),
        icon: '/static/icons/user-icon.svg',
        title: t('account-settings.section1.label'),
        iconAlt: 'User Icon',
        newSettingsView: 1,
      },
      {
        id: uuidV4(),
        icon: '/static/icons/terms-icon.svg',
        title: t('terms-conditions'),
        iconAlt: 'User Icon',
        newSettingsView: 3,
      },
      {
        id: uuidV4(),
        icon: '/static/icons/language.svg',
        title: t('account-settings.section2.label'),
        iconAlt: 'Language Icon',
        newSettingsView: 2,
      },
    ],
    [],
  );

  const handleActionClick = (newSettingsView: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    void dispatch(updateAccountSettingsView(newSettingsView));
  };

  const handleAccountLogout = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    handleLogout();
  };

  const handleDialogClose = useCallback(() => setOpen(false), [setOpen]);

  const handleDialogOpen = useCallback(() => setOpen(true), [setOpen]);

  const handleContactUs = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (isDeskTop) {
        return handleDialogOpen();
      }
      telephoneAnchorRef.current.click();
    },
    [isDeskTop, handleDialogOpen],
  );

  return {
    handleActionClick,
    handleAccountLogout,
    user,
    handleDialogClose,
    handleDialogOpen,
    open,
    handleContactUs,
    telephoneAnchorRef,
    accountActionsConfig,
  };
};
