import dayjs from 'dayjs';
import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

// .min(8, t('invoice-creation.validation.invoice-number-error.minimum')).matches(/[R][0-9]/, t('invoice-creation.validation.invoice-number-error.type'))
export const usePaymentFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object().shape({
    invoiceNumber: yup.string().required(t('invoice-creation.validation.invoice-number-error.required')),
    deliveryDate: yup
        .date()
        .max(dayjs().endOf('day'), t('invoice-creation.validation.delivery-date-error.maximum'))
        .typeError(t('invoice-creation.validation.delivery-date-error.type'))
        .required(t('invoice-creation.validation.delivery-date-error.required')),
    invoiceDate: yup
        .date()
        .max(dayjs().endOf('day'), t('invoice-creation.validation.invoice-date-error.maximum'))
        .typeError(t('invoice-creation.validation.invoice-date-error.type'))
        .required(t('invoice-creation.validation.invoice-date-error.required')),
    applicableLaw: yup.string().required(t('invoice-creation.validation.applicable-law-error.required')),
    paymentTerm: yup
        .number()
        .min(12, t('invoice-creation.validation.payment-term-error.minimum'))
        .typeError(t('invoice-creation.validation.payment-term-error.type'))
        .required(t('invoice-creation.validation.payment-term-error.required')),
    invoiceAmount: yup
        .number()
        .positive(t('invoice-creation.validation.invoice-amount-error.positive'))
        .typeError(t('invoice-creation.validation.invoice-amount-error.type'))
        .required(t('invoice-creation.validation.invoice-amount-error.required'))
        .test("is-decimal", t('invoice-creation.validation.invoice-amount-error.type'), (val) => Number.isInteger(+(val * (10 ** 2)).toFixed(2))),
  });
};
