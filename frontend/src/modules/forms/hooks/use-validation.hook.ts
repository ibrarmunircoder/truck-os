import { useAsyncEffect } from 'modules/common/hooks';
import { useMemo, useState } from 'react';
import { BaseSchema, ValidationError } from 'yup';

export interface ValidationRuleInterface {
  name: string;
  message: string;
}
export interface UseValidationParamsInterface {
  schema: BaseSchema;
  rules?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}

export const useValidation = (props: UseValidationParamsInterface): [ ValidationRuleInterface[], ValidationError[] ]  => {
  const { schema, label, rules, value } = props
  const [ validationErrors, setValidationErrors ] = useState([])

  const validationRules = useMemo(() => schema.tests
    .map(x => x.OPTIONS)
    .filter(x => rules?.includes(x.name))
    .map(x =>
      ({
        name: x.name,
        message: ValidationError.formatError(x.message, { path: label }),
      })
    ), [schema, label, rules])

  useAsyncEffect(async () => {
    try {
      await schema.validate(value, { abortEarly: false })
      setValidationErrors([])
    } catch (err) {
      setValidationErrors((err.inner || []).filter(x => !rules || rules.includes(x.type)))
    }
  }, [schema, value])

  return [
    validationRules,
    validationErrors,
  ];
};
