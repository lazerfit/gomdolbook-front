import { styled } from 'styled-components';
import { mediaMax } from '@/utils';
import * as mixins from '@/styles/mixins';

export const BookCoverMid = styled.img`
  width: 4rem;
  height: 6rem;
  border-radius: 0.3125rem;

  ${mediaMax.mobile} {
    width: 2.5rem;
  }
`;

export const BookCoverMidBig = styled.img`
  width: 7.5rem;
  max-height: 12rem;
  border-radius: 0.3125rem;
  object-fit: cover;

  ${mediaMax.mobile} {
    width: 100%;
  }
`;

export const BookCoverBig = styled.img`
  width: 12.5rem;
  height: auto;
  border-radius: 0.3125rem;
  ${mixins.boxShadowLight};
`;
