import { Variants } from 'framer-motion';

export enum colors {
  black = '#262627',
  white = '#fafafa',
  bgc = '#ebebeb',
  gray0 = '#f8f9fa',
  gray1 = '#f1f3f5',
  gray2 = '#e9ecef',
  gray3 = '#dee2e6',
  gray4 = '#ced4da',
  gray5 = '#adb5bd',
  gray6 = '#868e96',
  gray7 = '#495057',
  gray8 = '#343a40',
  gray9 = '#212529',
}

export enum MEDIA_SIZES {
  tablet = 1180,
  mobile = 768,
}

export enum fontFamily {
  english = 'Barlow Condensed',
  title = 'Gyeonggi_Batang_Regular',
  text = 'NanumSquareNeo-Variable',
}

export enum MODAL_SIZES {
  small = 'small',
  normal = 'normal',
  large = 'large',
}

/** framer-motion */
export const BounceInDownStates: Variants = {
  initial: { y: -300, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  exit: { y: -300, opacity: 0 },
};
