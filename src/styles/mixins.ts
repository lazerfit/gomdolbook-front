import { css, keyframes } from 'styled-components';
import { colors } from '@/utils/variables';

/** Layouts */
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

/** Colors **/
export const bgWhite = css`
  background-color: ${colors.bgc};
  color: ${colors.black};
`;

/** Modals */
export const modalSmall = css`
  width: 22.5rem;
  min-height: 12.5rem;
`;

export const modalNormal = css`
  width: 60rem;
  min-height: 80%;
`;

export const modalLarge = css`
  width: 73.75rem;
  min-height: 43.75rem;
`;

/** Box-shadow */
export const boxShadowLight = css`
  box-shadow:
    0 2px 0 0 rgba(186, 186, 186, 0.4),
    2px 1px 0 0 rgba(186, 186, 186, 0.35),
    2px 4px 0 0 rgba(186, 186, 186, 0.35),
    4px 2px 0 0 rgba(186, 186, 186, 0.3),
    4px 6px 0 0 rgba(186, 186, 186, 0.25),
    6px 4px 0 0 rgba(186, 186, 186, 0.25),
    6px 8px 0 0 rgba(186, 186, 186, 0.2),
    8px 6px 0 0 rgba(186, 186, 186, 0.2),
    8px 10px 0 0 rgba(186, 186, 186, 0.2),
    10px 8px 0 0 rgba(186, 186, 186, 0.15),
    10px 12px 0 0 rgba(186, 186, 186, 0.15),
    12px 10px 0 0 rgba(186, 186, 186, 0.12),
    12px 14px 0 0 rgba(186, 186, 186, 0.12),
    14px 10px 0 0 rgba(186, 186, 186, 0.08),
    14px 16px 0 0 rgba(186, 186, 186, 0.07),
    16px 14px 0 0 rgba(186, 186, 186, 0.06),
    16px 18px 0 0 rgba(186, 186, 186, 0.05),
    18px 16px 0 0 rgba(186, 186, 186, 0.04),
    18px 20px 0 0 rgba(186, 186, 186, 0.03),
    20px 16px 0 0 rgba(186, 186, 186, 0.02),
    20px 24px 0 0 rgba(186, 186, 186, 0.01),
    24px 20px 0 0 rgba(186, 186, 186, 0.01),
    24px 28px 0 0 rgba(186, 186, 186, 0.01);
`;

export const textShadow = css`
  text-shadow:
    0 2px rgba(186, 186, 186, 0.4),
    2px 1px rgba(186, 186, 186, 0.35),
    2px 4px rgba(186, 186, 186, 0.35),
    4px 2px rgba(186, 186, 186, 0.3),
    4px 6px rgba(186, 186, 186, 0.25),
    6px 4px rgba(186, 186, 186, 0.25),
    6px 8px rgba(186, 186, 186, 0.2),
    8px 6px rgba(186, 186, 186, 0.2),
    8px 10px rgba(186, 186, 186, 0.2),
    10px 8px rgba(186, 186, 186, 0.15),
    10px 12px rgba(186, 186, 186, 0.15),
    12px 10px rgba(186, 186, 186, 0.12),
    12px 14px rgba(186, 186, 186, 0.12),
    14px 10px rgba(186, 186, 186, 0.08),
    14px 16px rgba(186, 186, 186, 0.07),
    16px 14px rgba(186, 186, 186, 0.06),
    16px 18px rgba(186, 186, 186, 0.05),
    18px 16px rgba(186, 186, 186, 0.04),
    18px 20px rgba(186, 186, 186, 0.03),
    20px 16px rgba(186, 186, 186, 0.02),
    20px 24px rgba(186, 186, 186, 0.01),
    24px 20px rgba(186, 186, 186, 0.01),
    24px 28px rgba(186, 186, 186, 0.01);
`;

export const WaveLines = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

export const SkeletonAnimation = css`
  animation: ${WaveLines} 2s infinite ease-out;
`;

export const LineClamp = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
