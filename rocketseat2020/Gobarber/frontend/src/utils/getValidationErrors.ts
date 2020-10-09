import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default (validationErrors: ValidationError): Errors => {
  const result: Errors = {};

  validationErrors.inner.forEach((err) => {
    result[err.path] = err.message;
  });

  return result;
};
