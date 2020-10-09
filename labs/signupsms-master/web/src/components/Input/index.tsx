import React, { useState, InputHTMLAttributes } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, InputField, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
}

const Input: React.FC<InputProps> = ({ error, ...rest }) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <Container>
      <InputField {...rest} onBlur={() => setIsTouched(true)} />
      {error && isTouched && (
        <Error title={error}>
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
