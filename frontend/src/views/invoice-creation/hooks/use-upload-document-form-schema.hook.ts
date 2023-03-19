import { yup } from 'modules/common/validation';

export const useUploadDocumentFormSchema = (): yup.AnyObjectSchema => yup.object().shape({
    invoice: yup.mixed().required(),
    pod: yup.mixed().required()
});
