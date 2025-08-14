import { styled, css } from 'styled-components';
import { mediaMax } from '@/utils';

const small = css`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  padding: 0.5rem;
`;

const medium = css`
  width: 5.4rem;
  height: 2.5rem;
  padding: 0.625rem 1rem;
`;

const large = css`
  width: 7.5rem;
  height: 3.125rem;
  padding: 0.75rem 1.5rem;
`;

const sizes = {
  small,
  medium,
  large,
};

const ButtonStyle = styled.button<{ $size?: 'small' | 'medium' | 'large' }>`
  background-color: transparent;
  border: 1px solid var(--border3);
  border-radius: var(--border-radius-big);
  color: var(--black2);
  ${props => sizes[props.$size ?? 'medium']}
  transition: background-color 0.25s;

  &:hover {
    background-color: var(--bgc-grey);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--point);
    border: none;
  }

  ${mediaMax.mobile} {
    padding: 1rem 1.9rem;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ size, children, ...props }: ButtonProps) => {
  return (
    <ButtonStyle type="button" {...props} $size={size}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
