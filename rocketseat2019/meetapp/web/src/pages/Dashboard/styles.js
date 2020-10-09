import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    button {
      align-self: flex-end;

      display: flex;
      align-items: center;

      background: #f94d6a;
      margin: 5px 0 0;
      padding: 11px 25px;

      border: 0;
      border-radius: 4px;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#F94D6A')};
      }

      svg {
        margin-right: 5px;
      }

      span {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 0;
      }
    }
  }

  ul {
    margin-top: 30px;
  }
`;

export const Meetup = styled.div`
  background: #000;
  color: #fff;
  width: 100%;
  border-radius: 4px;
  padding: 20px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${props => (props.past ? 0.3 : 1)};
  & + & {
    margin-top: 10px;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const When = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  span {
    font-size: 16px;
  }

  button {
    background: none;
    border: 0;
    margin-left: 20px;
  }
`;
