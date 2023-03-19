import { ConfirmationModal } from "modules/common/components/confirmation-modal";
import { useTranslation } from "modules/common/hooks";
import { FunctionComponent } from "react";
import { useNotProceedModalStyles } from "views/invoice-creation/partials/not-proceed-modal/not-proceed-modal.styles";

export interface NotProceedModalPartialProps {
    handleConfirm: () => void;
    handleCancel?: () => void;
}

export const NotProceedModalPartial: FunctionComponent<NotProceedModalPartialProps> = (props) => {
    const classes = useNotProceedModalStyles();
    const { handleConfirm, handleCancel } = props;
    const { t } = useTranslation();

    return (
        <ConfirmationModal
            title={t('invoice-creation.not-proceed-modal.title')}
            confirmationMesage={<div><p>{t('invoice-creation.not-proceed-modal.message1')}</p>
            <p>{t('invoice-creation.not-proceed-modal.message2')}</p></div>}
            confirmButtonProps={{
                onClick: handleConfirm,
                children: t('invoice-creation.not-proceed-modal.confirm-btn-text'),
                className: classes.confirmButton
            }}
            cancelButtonProps={{
                onClick: handleCancel,
                children: t('invoice-creation.not-proceed-modal.cancel-btn-text'),
                className: classes.cancelButton
            }}
        />
    );
};
