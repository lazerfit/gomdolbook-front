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

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 0;
    gap: 30px;
  }
`;

export const BookContentWrapper = styled.article`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 20%;
    margin-top: 5px;
  }
`;

export const BookCover = styled.img`
  width: 200px;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadow.light};

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:hover {
    filter: none;
  }
`;

export const BookTitle = styled.h5`
  margin-top: 21px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 11px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const EmptyLibraryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 30px;
  }
`;

export const EmptyLibraryBanner = styled(motion.div)`
  font: ${(props) => props.theme.fonts.title};
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.title};
  line-height: 1;
  text-shadow: ${(props) => props.theme.shadow.text};

  @media (${(props) => props.theme.breakpoints.mobile}) {
    line-height: 1.2;
  }
`;
