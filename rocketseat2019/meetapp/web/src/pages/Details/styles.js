import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto 0;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    strong {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }
  }

  pre {
    font-size: 18px;
    color: #fff;
    white-space: pre-wrap;
  }
`;

export const Banner = styled.img`
  width: 100%;
  height: 300px;
  margin: 25px 0;
  opacity: ${props => (props.src ? 1 : 0)};
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: none;
`;

export const EditButton = styled.button`
  background: #4dbaf9;
  display: ${props => (props.canEdit ? 'flex' : 'none')};
  align-items: center;
  padding: 11px 15px;

  border: 0;
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    background: ${darken(0.05, '#4dbaf9')};
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
`;

export const CancelButton = styled.button`
  background: #d44059;
  display: ${props => (props.canDelete ? 'flex' : 'none')};
  align-items: center;
  padding: 11px 15px;
  margin-left: 10px;

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
`;

export const LocationSchedule = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 25px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    svg {
      margin-right: 10px;
    }

    span {
      font-size: 18px;
      color: #fff;
    }
  }
`;
