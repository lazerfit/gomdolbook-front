import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { SquareSkeleton } from '@/components/atoms/SkeletonLoader';

const Wrapper = styled.div`
  ${mixins.flexCenter};
  gap: var(--space-4);
  margin-top: 10rem;
`;

const ImageSkeleton = styled(SquareSkeleton)`
  width: 12.5rem;
  height: 18.75rem;
  border-radius: var(--radius-sm);
`;

const BookCoverListSkeleton = () => {
  return (
    <Wrapper>
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </Wrapper>
  );
};

export default BookCoverListSkeleton;
