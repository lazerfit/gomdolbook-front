import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { SquareSkeleton } from '@/components/atoms/SkeletonLoader';

const Wrapper = styled.div`
  ${mixins.flexCenter};
  gap: 2rem;
  margin-top: 10rem;
`;

const ImageSkeleton = styled(SquareSkeleton)`
  width: 12.5rem;
  height: 18.75rem;
  border-radius: 0.3125rem;
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
