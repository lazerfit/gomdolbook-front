import { styled } from 'styled-components';
import { fontFamilyEnglish } from '@/styles/fonts';

const Input = styled.input`
  width: 18.75rem;
  border: 1px solid var(--border2);
  background-color: var(--white);
  padding: 0.625rem;
  outline: none;
  border-radius: var(--border-radius-small);

  &:focus::placeholder {
    opacity: 0;
  }

  &:focus {
    border-color: var(--border3);
  }

  &::placeholder {
    color: var(--black);
    transition: opacity 0.3s;
    ${fontFamilyEnglish};
  }
`;

export default Input;
