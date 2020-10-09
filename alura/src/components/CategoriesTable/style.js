import styled from 'styled-components';

export const Table = styled.table`
  margin: 20px 0;
  width: 100%;

  &, td, th {
    border: 1px solid var(--primary);
    border-collapse: collapse;
  }

  td, th {
    padding: 5px;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: 0;
  color: var(--white);
  cursor: pointer;
  transition: all .2s ease-out;

  &:hover {
    transform: scale(1.2);
  }
`;
