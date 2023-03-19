import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { useRouter } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { useTranslation } from 'next-i18next';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useUserFileUploader } from 'views/files/hooks';
import { useUserFiles } from 'views/files/hooks/use-user-files.hook';
import { ActiveUploadsPartial } from 'views/files/partials/active-uploads/active-uploads.partial';
import { UserFilesPartial } from 'views/files/partials/user-files/user-files.partial';

export const FilesView = withAuth()((): ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const breadcrumbs = useRouteBreadcrumbs({ skipLast: id ? 2 : 0 });
  const { activeUploads, inProgressUploads, failedUploads, successUploads } = useUserFiles();
  const { removeActiveUploads, removeSuccessfulUploads } = useUserFileUploader();

  const failedUploadError = useMemo(() => {
    if (Boolean(failedUploads.length)) {
      return failedUploads[failedUploads.length - 1].error;
    }

    return null;
  }, [failedUploads]);

  useEffect(() => () => removeActiveUploads(), []);

  /*
    t('upload-failure_upload-url-missing')
    t('upload-failure_upload-url-expired')
    t('upload-failure_missing-max-file-size')
    t('upload-failure_file-size-exceeds-max-file-size')
    t('upload-failure_content-type-mismatch')
    t('upload-failure')
  */

  return (
    <MainLayout title={t('title_files')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <UserFilesPartial />
      {!!(inProgressUploads.length || failedUploads.length) && <ActiveUploadsPartial files={activeUploads} />}
      {Boolean(failedUploadError) && <FormAlert style={successUploads.length ? { marginTop: '5%' } : {}} error={failedUploadError} data-cy="files-view-upload-error-alert" />}
      <FormAlert
        open={!!successUploads.length}
        message={t('files.uploaded-successfully', { count: successUploads.length })}
        onClose={removeSuccessfulUploads}
      />
    </MainLayout>
  );
});
