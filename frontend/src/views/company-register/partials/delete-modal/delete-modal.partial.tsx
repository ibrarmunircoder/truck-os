import { ConfirmationModal } from "modules/common/components/confirmation-modal";
import { useTranslation } from "modules/common/hooks";
import { FunctionComponent } from "react";
import { useDeleteModalStyles } from "views/company-register/partials/delete-modal/delete-modal.styles";

export interface companyModalPartialProps {
    handleConfirm: () => void;
    handleCancel: () => void;
    confirmationMesage: string;
    title: string;
}

export const DeleteModalPartial: FunctionComponent<companyModalPartialProps> = (props) => {
    const classes = useDeleteModalStyles();
    const { t } = useTranslation();
    const { handleConfirm, handleCancel, confirmationMesage, title } = props;

    return (
        <ConfirmationModal
            title={title}
            confirmationMesage={confirmationMesage}
            confirmButtonProps={{
                onClick: handleConfirm,
                children: t('company-register.step5.delete-modal-confirm-text'),
                className: classes.confirmButton
                // disabled: !!isLoading,
            }}
            cancelButtonProps={{
                onClick: handleCancel,
                children: t('company-register.step5.delete-modal-cancel-text'),
                className: classes.cancelButton
            }}
        />
    );
};
