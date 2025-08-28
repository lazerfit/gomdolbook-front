import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const StyledSelect = styled.select`
  width: 10rem;
  border: 1px solid var(--grey6);
  padding: var(--space-1-5);
  border-radius: var(--radius-md);
  appearance: none;
  -webkit-appearance: none;
`;

export interface CommonSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { name: string; id: number }[];
}

const Select = ({ options, ...props }: CommonSelectProps) => {
  return (
    <Wrapper>
      <StyledSelect {...props}>
        {options.map((option, i) => {
          return (
            <option key={i} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </StyledSelect>
      <IoIosArrowDown
        style={{
          position: 'absolute',
          right: '0.625rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
    </Wrapper>
  );
};

export default Select;
