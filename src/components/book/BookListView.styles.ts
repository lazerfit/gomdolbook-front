import { styled } from "styled-components";
import { motion } from "framer-motion";

export const BookWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 45px;
  margin-top: 32px;
`;

export const BookContentWrapper = styled.article`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
`;

export const BookCover = styled.img`
  width: 200px;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadow.light};

  &:hover {
    filter: none;
  }
`;

export const BookTitle = styled.h5`
  margin-top: 21px;
`;

export const EmptyLibraryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex-direction: column;
`;

export const EmptyLibraryBanner = styled(motion.div)`
  font: ${(props) => props.theme.fonts.title};
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.title};
  line-height: 1;
  text-shadow: ${(props) => props.theme.shadow.text};
`;
