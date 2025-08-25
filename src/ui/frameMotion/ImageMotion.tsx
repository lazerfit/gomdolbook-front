import { styled } from 'styled-components';
import React, { useState } from 'react';
import { motion, useSpring, useMotionTemplate, transform } from 'framer-motion';
import { createPortal } from 'react-dom';
import Cat from '@/assets/img/pexels-nomino-3069334.jpg';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import { ImgBig } from '@/components/atoms/Img';

const Wrapper = styled(motion.div)`
  ${mixins.flexCenter};
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 1200px;

  ${mediaMax.mobile} {
    display: none;
  }
`;

const ImageMotion = () => {
  const [frame, setFrame] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const rotateValue = 15;
  const transformValue = rotateValue * 2;
  const springValue = { stiffness: 400, damping: 30 };

  const rotateX = useSpring(0, springValue);
  const rotateY = useSpring(0, springValue);
  const x = useSpring(0, springValue);
  const y = useSpring(0, springValue);
  const shadowX = useSpring(0, springValue);
  const shadowY = useSpring(30, springValue);

  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 68, 0.25))`;

  const convertCursorPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const objectX = (e.nativeEvent.clientX - frame.left) / frame.width;
    const objectY = (e.nativeEvent.clientY - frame.top) / frame.height;

    rotateX.set(transform(objectY, [0, 1], [rotateValue, -rotateValue]));
    rotateY.set(transform(objectX, [0, 1], [-rotateValue, rotateValue]));
    x.set(transform(objectX, [0, 1], [-transformValue, transformValue]));
    y.set(transform(objectY, [0, 1], [-transformValue, transformValue]));

    shadowX.set(transform(objectX, [0, 1], [20, -20]));
    shadowY.set(transform(objectY, [0, 1], [60, 20]));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentElement = e.currentTarget.getBoundingClientRect();

    setFrame({
      width: currentElement.width,
      height: currentElement.height,
      top: currentElement.top,
      left: currentElement.left,
    });

    convertCursorPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    convertCursorPosition(e);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
    shadowX.set(0);
    shadowY.set(40);
  };

  return createPortal(
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}>
      <ImgBig src={Cat} alt="emptyLibraryImage" style={{ rotateX, rotateY, filter, x, y }} />
    </Wrapper>,
    document.getElementById('root')!,
  );
};

export default ImageMotion;
