import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getValidationErrors = (error: ValidationError): Errors => {
  const errors: Errors = {};
  error.inner.forEach(err => {
    errors[err.path] = err.message;
  });

  return errors;
};

export default getValidationErrors;
