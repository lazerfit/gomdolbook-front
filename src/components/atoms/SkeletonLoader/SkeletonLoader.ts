import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';

export const CommonSkeleton = styled.div`
  background: rgba(130, 130, 130, 0.2);
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  ${mixins.SkeletonAnimation};
`;

export const LineSkeleton = styled(CommonSkeleton)`
  width: 100%;
  height: 12px;
  margin-bottom: 6px;
  border-radius: var(--border-radius-small);
`;

export const SquareSkeleton = styled(CommonSkeleton)`
  margin: 0 auto;
  border-radius: 9px;
`;
