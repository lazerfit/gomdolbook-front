import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { fontFamilyTitle } from '@/styles/fonts';
import { mediaMax } from '@/utils';
import { motion } from 'framer-motion';

const StyledBanner = styled(motion.div)`
  ${fontFamilyTitle};
  font-size: 3rem;
  line-height: 1;
  ${mixins.textShadow};

  ${mediaMax} {
    line-height: 1.2;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Banner = ({ children }: Props) => {
  return (
    <StyledBanner initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      {children}
    </StyledBanner>
  );
};

export default Banner;
