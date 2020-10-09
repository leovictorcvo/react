import styled from 'styled-components';

import backgroundImg from '../../assets/signup.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    width: 340px;
    text-align: center;
    margin: 40px 0;

    h1 {
      margin-bottom: 24px;
    }

    button {
      background: #ff9000;
      color: #312e38;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      width: 100%;
      height: 56px;
      margin-top: 18px;
      font-weight: 500;

      &:disabled {
        background: #fff555;
        cursor: not-allowed;
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
  }
`;

export const ConfirmContent = styled(Content)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 18px;
  input {
    flex: 1;
  }

  button {
    margin-top: 0 !important;
    margin-left: 18px;
  }
`;

export const Logo = styled.img`
  height: 100px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
