import { AppleIcon, GoogleIcon, LinkedInIcon } from 'modules/common/icons';
import { ComponentType, useMemo } from 'react';

export interface UseSsoProvidersInterface {
  providersById: Record<string, { name: string; Icon: ComponentType<{ className?: string }>; titleTranslationKey: string }>;
}

export const useSsoProviders = (): UseSsoProvidersInterface => {
  const providersById = useMemo(
    () => ({
      google: {
        name: 'Google',
        Icon: GoogleIcon,
        titleTranslationKey: 'social-login.google',
      },
      linkedin: {
        name: 'LinkedIn',
        Icon: LinkedInIcon,
        titleTranslationKey: 'social-login.linkedin',
      },
      apple: {
        name: 'Apple',
        Icon: AppleIcon,
        titleTranslationKey: 'social-login.apple',
      },
    }),
    [],
  );

  return {
    providersById,
  };
};
