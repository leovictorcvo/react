import styled from 'styled-components';

export const ExtraLink = styled.a`
  margin-left: 16px;


  @media (max-width: 800px) {
    display: block;
    margin-bottom: 16px;
    margin-left: 0;
  }
`;

export const Title = styled.h3`
  border-radius: 4px;
  display: inline-block;
  font-size: 35px;
  font-weight: normal;
  line-height: 1;
  margin-bottom: 16px;
  padding: 20px;

  @media (max-width: 800px) {
    font-size: 18px;
    padding: 10px;
  }
`;

export const VideoCardGroupContainer = styled.section`
  color: var(--white);
  margin-bottom: 16px;
  min-height: 197px;
`;
