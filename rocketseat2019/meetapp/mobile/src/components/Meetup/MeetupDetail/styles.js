import styled from 'styled-components/native';

export const Container = styled.View`
  background: transparent;

  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 13px;
  margin-left: 10px;
  color: #999;
`;
