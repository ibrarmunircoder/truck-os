import { ConfirmationModal } from "modules/common/components/confirmation-modal";
import { useTranslation } from "modules/common/hooks";
import { FunctionComponent } from "react";
import { useUpdateInvoiceModalStyles } from "views/invoice-creation/partials/update-invoice-modal/update-invoice-modal.styles";

export interface UpdateInvoiceModalPartialProps {
    handleConfirm: () => void;
    handleCancel: () => void;
}

export const UpdateInvoiceModalPartial: FunctionComponent<UpdateInvoiceModalPartialProps> = (props) => {
    const classes = useUpdateInvoiceModalStyles();
    const { handleConfirm, handleCancel } = props;
    const { t } = useTranslation();

    return (
        <ConfirmationModal
            title={t('invoice-creation.update-invoice-modal.title')}
            confirmationMesage={<div><p>{t('invoice-creation.update-invoice-modal.message1')} </p>
            <p>{t('invoice-creation.update-invoice-modal.message2')}</p></div>}
            confirmButtonProps={{
                onClick: handleConfirm,
                children: t('invoice-creation.update-invoice-modal.confirm-btn-text'),
                className: classes.confirmButton
            }}
            cancelButtonProps={{
                onClick: handleCancel,
                children: t('invoice-creation.update-invoice-modal.cancel-btn-text'),
                className: classes.cancelButton
            }}
        />
    );
};
