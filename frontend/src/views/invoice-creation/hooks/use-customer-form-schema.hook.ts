import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

export const useCustomerFormSchema = (): yup.AnyObjectSchema => {
    const { t } = useTranslation();
    return yup.object().shape({
        name: yup.string().typeError(t('invoice-creation.validation.company-name-error.required')).required(t('invoice-creation.validation.company-name-error.required')),
        vatNumber: yup.string().typeError(t('invoice-creation.validation.vat-number-error.required')).required(t('invoice-creation.validation.vat-number-error.required')),
        commercialRegisterNumber: yup.string().typeError(t('invoice-creation.validation.commercial-register-number-error.required')).required(t('invoice-creation.validation.commercial-register-number-error.required')),
        commercialRegister: yup.string().min(8, t('invoice-creation.validation.commercial-register-error.type')).matches(/^[A-Z0-9\s]+$/, 'invoice-creation.validation.commercial-register-error.type').required(t('invoice-creation.validation.commercial-register-error.required')),
        legalForm: yup.string().typeError(t('invoice-creation.validation.legalform-error.required')).required(t('invoice-creation.validation.legalform-error.required')),
        validated: yup.boolean().required(t('invoice-creation.validation.validated-error.required')),
        debtorReferenceId: yup.string().nullable(true),
        city: yup.string().required(t('invoice-creation.validation.city-error.required')),
        addressAddon: yup.string(),
        postalCode: yup.string().typeError(t('invoice-creation.validation.postalcode-error.type')).required(t('invoice-creation.validation.postalcode-error.required')),
        streetAndNumber: yup.string().required(t('invoice-creation.validation.street-number-error.required')),
        country: yup.string().required(t('invoice-creation.validation.country-error.required')),
        representative: yup.object().shape({
            name: yup.string().typeError(t('invoice-creation.validation.contact-name-error.required')).required(t('invoice-creation.validation.contact-name-error.required')).matches(/^([^0-9]*)$/, t('invoice-creation.validation.number-not-allowed-error')),
            phone: yup.number().integer().typeError(t('invoice-creation.validation.phone-number-error.type')).required(t('invoice-creation.validation.phone-number-error.required')),
            email: yup.string().email(t('invoice-creation.validation.contact-email-error.type')).required(t('invoice-creation.validation.contact-email-error.required')),
            debtorId: yup.string()
        })
    });
};
