import { styled } from 'styled-components';
import { fontFamilyEnglish } from '@/styles/fonts';

const Input = styled.input`
  width: 18.75rem;
  border: 1px solid var(--border-color-2);
  background-color: var(--white);
  padding: var(--space-1-5);
  outline: none;
  border-radius: var(--radius-md);

  &:focus::placeholder {
    opacity: 0;
  }

  &:focus {
    border-color: var(--border-color-3);
  }

  &::placeholder {
    color: var(--primary-text);
    transition: opacity 0.3s;
    ${fontFamilyEnglish};
  }
`;

export default Input;
