/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/name-of-class-and-function-rule */
/* file name is conflicting with other rule */
import { initializeAction } from 'modules/auth/auth.slice';
import { useAuth } from 'modules/auth/hooks';
import { Loader } from 'modules/common/components/loader';
import { useRouter } from 'modules/common/hooks';
import { useSession } from 'next-auth/react';
import React, { ComponentType, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import routes from 'routes';

export interface WithAuthHocParamsInterface {
  redirect?: boolean;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export function withAuth<Props>({
  redirect = true,
  redirectTo,
  redirectIfAuthenticated = false,
}: WithAuthHocParamsInterface = {}): (WrappedComponent: ComponentType<Props>) => ComponentType<Props> {
  const realRedirectTo = redirectTo || (redirectIfAuthenticated ? routes.home : routes.login);

  return (WrappedComponent: ComponentType<Props>): ComponentType<Props> => {
    const WithAuth = (props: Props) => {
      const router = useRouter();
      const dispatch = useDispatch();
      const { isInitializing, user, accessToken, sessionUpdatedAt } = useAuth();
      const { data: session, status } = useSession();
      const isLoading = useMemo(() => status === 'loading', [status])
      const shouldRedirect = useMemo(
        // we need both access token and user to consider current session as authenticated
        () => !isInitializing && Boolean(redirectIfAuthenticated) === Boolean(accessToken && user),
        [isInitializing, user, accessToken],
      );
      useEffect(() => {
        // we check if session was really reloaded by comparing updatedAt
        if (!isLoading && session !== undefined && sessionUpdatedAt !== session?.updatedAt) {
          dispatch(initializeAction({ session }));
        }
      }, [isLoading, session, sessionUpdatedAt]);

      useEffect(() => {
        // redirect only after first session load
        if (redirect && shouldRedirect) {
          void router.replace({ route: realRedirectTo });
        }
      }, [shouldRedirect]);

      // only show loader when initializing session (first time)
      if (isInitializing || shouldRedirect) {
        return <Loader />;
      }

      return <WrappedComponent {...props} />;
    };
    return WithAuth;
  };
}
