import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => props.backgroundColor || 'var(--primary)'};
  border: 1px solid ${(props) => props.backgroundColor || 'var(--primary)'};
  border-radius: 4px;
  color: ${(props) => props.color || 'var(--white)'};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  padding: 16px 24px;
  text-decoration: none;

  & + button {
    margin-left: 40px;
  }
`;

export default Button;
