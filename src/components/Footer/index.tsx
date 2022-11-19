import { ReactNode } from 'react';

import { FooterWrapper, FooterContainer } from './styles';

interface FooterProps {
  children: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <FooterWrapper>
      <FooterContainer>
        {children}
      </FooterContainer>
    </FooterWrapper>
  );
}
