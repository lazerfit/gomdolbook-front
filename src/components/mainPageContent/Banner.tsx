import { styled } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  text-align: center;
  display: flex;
`;

const MainSlogan = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 5.563rem;
  font-weight: 600;
  line-height: 120%;
  font-family: ${(props) => props.theme.fonts.english}, serif;
`;

const Banner = () => {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [200, 400], [107, 0]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      console.log("현재 scrollY 값:", latest);
    });
  }, [scrollY]);

  return (
    <Wrapper style={{ height }}>
      <MainSlogan>Collect your Books</MainSlogan>
    </Wrapper>
  );
};

export default Banner;
