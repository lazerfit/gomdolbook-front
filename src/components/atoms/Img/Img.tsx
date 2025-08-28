import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const Image = styled(motion.img)`
  display: block;
  filter: grayscale(1);
  transform-origin: center;
  border-radius: var(--radius-md);
  height: auto;
  object-fit: contain;
`;

export const ImgBig = styled(Image)`
  width: 300px;
`;
