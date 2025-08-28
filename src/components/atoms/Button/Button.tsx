import { styled, css } from 'styled-components';
import { mediaMax } from '@/utils';

const small = css`
  font-size: 0.875rem; /* 14px */
  padding: var(--space-half) var(--space-1-5); /* 4px 12px */
`;

const medium = css`
  font-size: 1rem; /* 16px */
  padding: var(--space-1) var(--space-2); /* 8px 16px */
`;

const large = css`
  font-size: 1.125rem; /* 18px */
  padding: var(--space-1-5) var(--space-3); /* 12px 24px */
`;

const primary = css`
  background-color: var(--accent-color);
  border: 1px solid var(--accent-color);
  color: var(--white);

  &:hover {
    background-color: var(--accent-color-hover);
    border-color: var(--accent-color-hover);
  }
`;

const secondary = css`
  background-color: transparent;
  border: 1px solid var(--border-color-3);
  color: var(--primary-text);

  &:hover {
    background-color: var(--background-grey);
  }
`;

const sizes = {
  small,
  medium,
  large,
};

const variants = {
  primary,
  secondary,
};

const ButtonStyle = styled.button<{ $size?: 'small' | 'medium' | 'large'; $variant?: 'primary' | 'secondary' }>`
  ${props => variants[props.$variant ?? 'secondary']}
  ${props => sizes[props.$size ?? 'medium']}
  transition: background-color 0.25s;
  border-radius: var(--radius-full);

  &:disabled {
    cursor: not-allowed;
    background-color: var(--accent-color);
    color: var(--white);
    border: none;
  }

  ${mediaMax.mobile} {
    padding: 1rem 1.5rem;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

const Button = ({ size, children, variant, ...props }: ButtonProps) => {
  return (
    <ButtonStyle type="button" {...props} $size={size} $variant={variant}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
