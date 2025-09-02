import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { LineSkeleton } from '@/components/atoms/SkeletonLoader';

const Wrapper = styled.div`
  ${mixins.flexCenter};
  margin-top: var(--space-3);
`;

const Line = styled(LineSkeleton)`
  width: 18.75rem;
  height: 2.3125rem;
  border-radius: var(--radius-sm);
`;

const InputSkeleton = () => {
  return (
    <Wrapper>
      <Line />
    </Wrapper>
  );
};

export default InputSkeleton;
