import { useTranslation } from 'modules/common/hooks';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

interface ContentSchemaInterface {
  id: string;
  text: string;
}

interface UseCompanyVerificationInfoHookInterface {
  contentSchemaOne: ContentSchemaInterface[];
  contentSchemaTwo: ContentSchemaInterface[];
}

export const useCompanyVerificationInfo = (): UseCompanyVerificationInfoHookInterface => {
  const { t } = useTranslation();

  const contentSchemaOne = useMemo(
    () => [
      { id: uuid(), text: t('company-register.step7.description1') },
      { id: uuid(), text: t('company-register.step7.description2') },
    ],
    [],
  );

  const contentSchemaTwo = useMemo(
    () => [
      {
        id: uuid(),
        text: t('company-register.step7.description3'),
      },
    ],
    [],
  );

  return {
    contentSchemaOne,
    contentSchemaTwo,
  };
};
