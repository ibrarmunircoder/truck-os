import { Box, Card, Typography } from '@mui/material';
import clsx from 'clsx';
import { Dialog } from 'modules/common/components';
import { Button } from 'modules/common/components/button';
import { useTranslation } from 'modules/common/hooks';
import MoneyWhiteIcon from 'modules/common/icons/money-icon-white.svg';
import TrashIcon from 'modules/common/icons/trash-icon.svg';
import WalletWhiteIcon from 'modules/common/icons/wallet-white.svg';
import { classes as classesList } from 'modules/common/utils';
import { FormAlert } from 'modules/forms/components';
import { Order } from 'modules/payment-dashboard/interfaces';
import { FunctionComponent } from 'react';
import NumberFormat from 'react-number-format';
import { ButtonStatusBgEnum, ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import { useRecord } from 'views/payment-dashboard/hooks';
import { DeleteRequestModal } from 'views/payment-dashboard/partials';
import { useRecordStyles } from 'views/payment-dashboard/partials/record/record.styles';
import { formatDeliveryDate } from 'views/payment-dashboard/utils';

export interface RecordInterface {
  order: Order;
}

export const RecordPartial: FunctionComponent<RecordInterface> = ({ order }) => {
  const classes = useRecordStyles();
  const { t } = useTranslation();

  const {
    id: orderId,
    debtor: { name, status: debtorStatus },
    draft,
    invoiceNumber,
    receivableAmount,
    deliveryDate,
    status,
    orderFiles,
  } = order;

  const {
    isBtnStatusDisabled,
    btnStatusText,
    handleBtnStatusClick,
    handleDialogClose,
    open,
    buttonBgColor,
    isMoneyPendingIcon,
    handleOpenDeleteRequestModal,
    handleCloseDeleteRequestModal,
    handleConfirmDeleteRequestClick,
    openDeleteRequestModal,
    error,
    handleResetError,
    handleCardClick,
  } = useRecord(debtorStatus, status ? status : null, draft, orderId, orderFiles, invoiceNumber);

  const icon = isMoneyPendingIcon ? <MoneyWhiteIcon /> : <WalletWhiteIcon />;
  const statusBtnElement = btnStatusText ? (
    <Button
      aria-label="debtor-receivable-status-text"
      className={clsx(
        classes.paymentStatusButton,
        buttonBgColor === ButtonStatusBgEnum.SUCCESS
          ? classes.successStatus
          : buttonBgColor === ButtonStatusBgEnum.DANGER
          ? classes.dangerStatus
          : classes.defaultStatus,
      )}
      onClick={handleBtnStatusClick}
      disabled={isBtnStatusDisabled}
      type="button"
      variant="contained"
      fullWidth
      text={btnStatusText}
    />
  ) : null;

  const amountElement = (
    <Box component={'div'} className={classes.recordAmountWrapper}>
      <Typography component={'span'} className={classes.recordAmount}>
        <NumberFormat
          value={receivableAmount}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
          suffix=" €"
        />
      </Typography>
      {draft && <TrashIcon onClick={handleOpenDeleteRequestModal} />}
    </Box>
  );

  return (
    <Card data-testid="payment-card" className={classes.recordCard} onClick={handleCardClick}>
      {error && <FormAlert error={error} onClose={handleResetError} />}
      <Box
        component={'div'}
        className={classesList(
          classes.iconSquare,
          isMoneyPendingIcon ? classes.greyBgGradient : classes.greenBgGradient,
        )}
      >
        {icon}
      </Box>
      <Box component={'div'} className={classes.recordDetails}>
        <Box component={'div'} marginBottom={3} className={classes.recordHead}>
          <Typography data-testid="debtor-name" component={'h6'} className={classes.recordHeading}>
            {name}
          </Typography>
          {amountElement}
        </Box>
        <Box component={'div'} className={classes.paymentCardDetail}>
          <Box component={'div'}>
            <Typography component={'p'} className={classes.recordText}>
              {formatDeliveryDate(deliveryDate, t('payment-dashboard.delivered'))}
            </Typography>
            {/* <Typography component={'p'} className={classes.recordText}>
              Payment in
              <Typography className={classes.recordHeading} component="span">
                {paymentTerm} days
              </Typography>
            </Typography> */}
          </Box>
          {statusBtnElement}
        </Box>
      </Box>
      {open && (
        <Dialog title="" onClose={handleDialogClose}>
          <Box>
            <Typography data-testid="contact-us-title" component="h2" className={classes.dialogContentTitle}>
              {status && status === ReceivableStatusEnum.UNPAID
                ? t('payment-dashboard.contact-modal.title')
                : t('payment-dashboard.contact-modal.title-v2')}
            </Typography>
            <p aria-label="plus 4 9 2 2 1 9 8 8 1 9 3 8 6" className={classes.dialogContentPhoneNumber}>
              +49 221 98819386
            </p>
            <Typography className={classes.dialogContentDescription} component="p">
              {t('payment-dashboard.contact-modal.description')}
            </Typography>
          </Box>
        </Dialog>
      )}
      {openDeleteRequestModal && (
        <DeleteRequestModal
          handleCancelClick={handleCloseDeleteRequestModal}
          handleConfirmClick={handleConfirmDeleteRequestClick(orderId)}
        />
      )}
    </Card>
  );
};
