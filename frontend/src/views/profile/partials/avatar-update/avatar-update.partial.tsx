import { CircularProgress } from '@mui/material';
import { FunctionComponent } from 'react';
import { useAvatarUpdateStyles } from 'views/profile/partials/avatar-update/avatar-update.styles';

export interface AvatarUpdatePartialInterface {
  src?: string;
  initials?: string;
  isUploading?: boolean;
}

export const AvatarUpdatePartial: FunctionComponent<AvatarUpdatePartialInterface> = ({
  src,
  initials,
  isUploading,
}) => {
  const classes = useAvatarUpdateStyles();

  return (
    <div className={classes.avatarWrap}>
      {src && <img src={src} className={classes.avatarImage} />}
      {!Boolean(src) && Boolean(initials) && <div className={classes.avatarText}>{initials}</div>}

      {isUploading && (
        <div className={classes.loaderWrap}>
          <CircularProgress color="primary" classes={{ colorPrimary: classes.loaderColor }} />
        </div>
      )}
    </div>
  );
};
