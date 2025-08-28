import { styled } from 'styled-components';
import { StatusButtonOptions } from '@/utils';
import Button from '@/components/atoms/Button';
import { BookStatus } from '@/api/services/types';

const Wrapper = styled.div`
  display: flex;
  gap: var(--space-1);
`;

interface Props {
  onSave: (status: BookStatus) => void;
  status: BookStatus;
}

const StatusButton = ({ onSave, status }: Props) => {
  return (
    <Wrapper>
      {StatusButtonOptions.map(option => {
        return (
          <Button
            key={option.status}
            size="medium"
            variant={'secondary'}
            onClick={() => onSave(option.status)}
            data-testid={`status-button-${option.status}`}
            disabled={option.status === status}>
            {option.label}
          </Button>
        );
      })}
    </Wrapper>
  );
};

export default StatusButton;
