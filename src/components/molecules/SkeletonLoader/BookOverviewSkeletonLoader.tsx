import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { LineSkeleton, SquareSkeleton } from '@/components/atoms/SkeletonLoader';
import { mediaMax } from '@/utils';

const Wrapper = styled.div`
  ${mixins.flexCenter};
  flex-direction: row;
  width: 53.125rem;
  height: 12.5rem;
  gap: 1.25rem;

  ${mediaMax.mobile} {
    margin-top: 0;
  }
`;

const ImageSkeleton = styled(SquareSkeleton)`
  width: 7.5rem;
  height: 10rem;
  border-radius: 0.32rem;
`;

const Content = styled.div`
  ${mixins.flexColumn};
  width: 100%;
  gap: 0.625rem;
`;

const BookOverviewSkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <Wrapper key={i}>
            <ImageSkeleton />
            <Content>
              {Array.from({ length: 3 }, (_, i) => {
                return <LineSkeleton key={i} />;
              })}
            </Content>
          </Wrapper>
        );
      })}
    </>
  );
};

export default BookOverviewSkeletonLoader;
