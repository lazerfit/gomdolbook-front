import { MEDIA_SIZES } from '@/utils/variables';

type Labels = keyof typeof MEDIA_SIZES;

export { default as StatusButtonOptions } from './StatusButtonOptions';
export * from './date';

export const media = (Object.keys(MEDIA_SIZES) as Labels[]).reduce(
  (acc, label) => {
    acc[label] = `
    @media (min-width: ${MEDIA_SIZES[label] / 16}em)
  `;
    return acc;
  },
  {} as Record<Labels, string>,
);

export const mediaMax = (Object.keys(MEDIA_SIZES) as Labels[]).reduce(
  (acc, label) => {
    acc[label] = `
    @media (max-width: ${(MEDIA_SIZES[label] - 1) / 16}em)
  `;
    return acc;
  },
  {} as Record<Labels, string>,
);
