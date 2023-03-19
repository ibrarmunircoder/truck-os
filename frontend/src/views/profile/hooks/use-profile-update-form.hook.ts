import { updateAuthUserAction } from 'modules/auth/auth.slice';
import { useAuth } from 'modules/auth/hooks';
import { EnhancedFormikConfig, useEnhancedFormik, UseEnhancedFormikInterface } from 'modules/forms/hooks';
import { useUserUpdate } from 'modules/users/hooks';
import { UserInterface } from 'modules/users/interfaces';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAvatarUpdate } from 'views/profile/hooks/use-avatar-update.hook';
import { useProfileUpdateFormSchema } from 'views/profile/hooks/use-profile-update-form-schema.hook';

export interface ProfileUpdateFormValuesInterface {
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  position?: string;
  streetAddress?: string;
  zipCode?: string;
  houseNumber?: string;
  city?: string;
  country?: string;
  about?: string;
}

export interface UseProfileUpdateFormInterface extends UseEnhancedFormikInterface<ProfileUpdateFormValuesInterface> {
  handleAvatarFileChange: (evt?: ChangeEvent<HTMLInputElement>) => void;
  formik: UseEnhancedFormikInterface<ProfileUpdateFormValuesInterface>;
}

export const useProfileUpdateForm = (
  user: UserInterface,
  formikConfig: Partial<EnhancedFormikConfig<ProfileUpdateFormValuesInterface>>,
): UseProfileUpdateFormInterface => {
  const dispatch = useDispatch();
  const { user: authUser } = useAuth();
  const { updateUser } = useUserUpdate();
  const { uploadAvatar, handleAvatarFileChange, avatarFile, setAvatarFile } = useAvatarUpdate(user.id);

  const initialValues = useMemo(
    () => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: '+15005550006', // dummy data for demo purpose
      company: 'Oriental Carpet Trading Ltd',
      position: 'Design Lead',
      streetAddress: 'Brehmenstrasse',
      zipCode: '13197',
      houseNumber: '21',
      city: 'Berlin',
      country: 'Germany',
      about: 'More than 10 years I help companies define, design and launch products with highly polished user experiences and visual directions, across many industries.',
    }),
    [user.firstName, user.lastName, user.email],
  );

  const onSubmit = useCallback(
    async (formValues: ProfileUpdateFormValuesInterface) => {
      // exclude the dummy data from the request since they don't
      // exist yet in our backend
      delete formValues.phone;
      delete formValues.company;
      delete formValues.position;
      delete formValues.streetAddress;
      delete formValues.zipCode;
      delete formValues.houseNumber;
      delete formValues.city;
      delete formValues.country;
      delete formValues.about;

      const data = await updateUser(user.id, formValues);

      if (avatarFile) await uploadAvatar();
      if (authUser.id === user.id) {
        await dispatch(updateAuthUserAction(data));
      }
    },
    [user.id, updateUser],
  );

  const formik = useEnhancedFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit,
    validationSchema: useProfileUpdateFormSchema(),
    ...formikConfig,
  });

  const resetForm = useCallback(() => {
    formik.resetForm();
    setAvatarFile(null);
  }, [formik.resetForm]);

  const dirty = useMemo(() => !!formik.dirty || !!avatarFile, [formik.dirty, avatarFile]);

  return { handleAvatarFileChange, ...formik, formik, dirty, resetForm };
};
