import MuiDialog, { DialogProps as MuiDialogProps} from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useDialogStyles } from 'modules/common/components/dialog/dialog.styles';
import { FunctionComponent, ReactNode } from 'react';

export type DialogProps = {
  title: string;
  children: ReactNode;
  onClose: MuiDialogProps['onClose'];
}

export const Dialog: FunctionComponent<DialogProps> = (props) => {
  const {
    title,
    children,
    onClose,
  } = props;

  const classes = useDialogStyles();

  return (
    <MuiDialog
      open
      fullWidth
      onClose={onClose}
    >
      <DialogTitle className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </MuiDialog>
  )
}


