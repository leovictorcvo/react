import styled from 'styled-components';

import Button from '../Button';

export const LogoImage = styled.img`
  max-width: 168px;

  @media (max-width: 800px) {
    max-width: 105px;
  }
`;

export const MenuWrapper = styled.nav`
  background: var(--black);
  border-bottom: 2px solid var(--primary);

  height: 94px;
  left: 0;
  padding-left: 5%;
  padding-right: 5%;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 100;

  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    height: 40px;
    justify-content: center;
  }
`;

export const ButtonLink = styled(Button)`
  @media (max-width: 800px) {
    background: var(--primary);
    border: 0;
    border-radius: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    position: fixed;
    right: 0;
    text-align: center;
  }
`;
