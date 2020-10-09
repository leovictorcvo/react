import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #666;
      }
    }
  }
`;

export const IssueFilter = styled.ul`
  list-style: none;
  margin: 0 0 15px 0;
  padding: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;

  h2 {
    flex: 1;
  }

  li {
    display: inline;
    margin: 0;
    border: 0;
    padding: 0;

    & + li {
      margin: 0 0 0 10px;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      font-size: 16px;
      color: #333;

      &:hover {
        color: #7159c1;
      }
    }
  }
`;
export const FilterButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: #fff;
  color: #7159c1;
  font-weight: 600;
  border: 1px solid #eee;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.active &&
    css`
      background: #7159c1;
      color: #fff;
    `}
`;

export const Pagination = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled || props.loading,
}))`
  background: #7159c1;
  color: #fff;
  font-weight: 600;
  border: 0;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
