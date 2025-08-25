import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { LineSkeleton, SquareSkeleton } from '@/components/atoms/SkeletonLoader';

const Wrapper = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

const Line = styled(LineSkeleton)`
  width: 10rem;
`;

const Image = styled(SquareSkeleton)`
  width: 12.5rem;
  height: 15rem;
`;

const Overview = styled(SquareSkeleton)`
  width: 25rem;
  height: 10rem;
  margin-top: 2rem;
`;

const BookDetailSkeletonLoader = () => {
  return (
    <Wrapper>
      <Line />
      <Line />
      <Line />
      <Image />
      <Overview />
    </Wrapper>
  );
};

export default BookDetailSkeletonLoader;
