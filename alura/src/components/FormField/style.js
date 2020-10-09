import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 28px;
  padding-top: 12px;
  position: relative;

  label {
    color: var(--grayLight);
    font-size: 18px;
    left: 8px;
    pointer-events: none;
    position: absolute;
    top: 26px;
    transition: all 0.3s ease-out;
  }

  textarea {
    min-height: 150px;
  }

  input[type="color"] {
    min-height: 50px;
    padding: 10px 15px;
  }
`;

export const Input = styled.input`
  background: var(--black);
  border: 0;
  border-radius: 5px;
  color: var(--grayLight);
  font-size: 18px;
  outline: 0;
  padding: 15px 7px;
  transition: all 0.2s ease-out;
  width: 100%;

  &::placeholder {
    color: transparent;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: translateY(-35px);
    font-size: 12px;
    opacity: 0.7;
  }
`;
