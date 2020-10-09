import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 12px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 12px;
  }
`;

export const InputField = styled.input`
  color: #232129;
  background: transparent;
  flex: 1;
  border: 0;

  &::placeholder {
    color: #9a9a9a;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  color: #c53030;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
