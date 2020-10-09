import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const VideoCardContainer = styled.a`
  width: 298px;
  height: 197px;

  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border: 2px solid;
  border-radius: 10px;
  display: flex;
  flex: 0 0 298px;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  transition: .2s all;

  &:hover {
    border: 4px solid;
    transform: scaleX(1.2);
    margin-right: 30px;
    margin-left: 30px;
    opacity: 1;
  }
`;

VideoCardContainer.Title = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: #000000a3;
  ${VideoCardContainer}:hover &{
    opacity: 1;
  }
`;

VideoCardContainer.Title.Text = styled.div`
  color: var(--white);
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
