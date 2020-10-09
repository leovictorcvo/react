import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import getValidationErrors from '../utils/getValidationErrors';

type KeyValueMap = {
  [key: string]: string;
};

type HandleFormEventFunction = (
  event: React.FormEvent<HTMLInputElement>,
) => void;

type HookParams = {
  initialValues: KeyValueMap;
  schema: Yup.ObjectSchema;
};

type HookResult = {
  values: KeyValueMap;
  errors: KeyValueMap;
  handleChange: HandleFormEventFunction;
};

const useForm = ({ initialValues, schema }: HookParams): HookResult => {
  const [errors, setErrors] = useState({});
  const [validateSchema] = useState(schema);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const validate = async () => {
      try {
        setErrors({});
        await validateSchema.validate(values, { abortEarly: false });
      } catch (error) {
        setErrors(getValidationErrors(error));
      }
    };
    validate();
  }, [values, validateSchema]);

  const handleChange: HandleFormEventFunction = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const field = event.target as HTMLInputElement;
    const fieldName = field.getAttribute('name') || '';
    const { value } = field;
    if (!fieldName) {
      throw new Error('Field must have a name');
    }
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
