import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-self: center;
  margin-bottom: 30px;
`;

export const BannerContainer = styled.label`
  cursor: pointer;
  opacity: 1;
  pointer-events: all;

  &:hover {
    opacity: 0.7;
  }

  img {
    height: 300px;
    min-width: 100%;
    display: ${props => (props.src ? 'block' : 'none')};
  }

  div {
    background: #000;
    height: 300px;
    min-width: 100%;
    display: ${props => (props.src ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  input {
    display: none;
  }
`;

export const Message = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`;
