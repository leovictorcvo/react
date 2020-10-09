import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputWrapper } from './style';

const FormField = ({
  label, type, value, name, onChange, suggestions,
}) => {
  const id = `id_${name}`;
  const tag = type === 'textarea' ? 'textarea' : 'input';

  return (
    <InputWrapper filled={!!value} type={type}>
      <Input
        as={tag}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={label}
        type={type}
        value={value}
        autoComplete="off"
        list={`suggestionFor_${id}`}
      />
      <label htmlFor={id}>{label}</label>
      { suggestions.length > 0 && (
      <datalist id={`suggestionFor_${id}`}>
        {suggestions.map((suggestion) => (
          <option
            value={suggestion}
            key={suggestion}
          >
            {suggestion}
          </option>
        ))}
      </datalist>
      )}
    </InputWrapper>
  );
};

FormField.defaultProps = {
  type: 'text',
  value: '',
  suggestions: [],
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
