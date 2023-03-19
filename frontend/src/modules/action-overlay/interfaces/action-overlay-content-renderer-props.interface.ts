import { UseEnhancedFormikInterface } from 'modules/forms/hooks';

export interface ActionOverlayContentRendererPropsInterface<TOverlayData, TFormValues> {
  data?: TOverlayData;
  formik?: UseEnhancedFormikInterface<TFormValues>;
}
