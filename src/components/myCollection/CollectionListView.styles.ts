import { styled } from "styled-components";
import { motion } from "framer-motion";

export const CollectionWrapper = styled(motion.section)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 32px;
  gap: 20px;
  flex-wrap: wrap;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    padding: 20px;
  }

  @media (${(props) => props.theme.breakpoints.tablet}) {
    margin: 32px auto;
    justify-content: center;
  }
`;

export const BookCoverImage = styled.img`
  width: 80px;
  border-radius: 8px;
  filter: grayscale(1);
  transition: 0.5s;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 40px;
  }
`;

interface IName {
  $collectionName: string;
}

export const CollectionCard = styled.div<IName>`
  width: 280px;
  height: 280px;
  padding: 20px;
  margin-bottom: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow.light};
  cursor: pointer;
  position: relative;
  border: 2px solid black;

  &::before {
    content: "${(props) => props.$collectionName}";
    position: absolute;
    bottom: -30px;
  }

  &:hover > ${BookCoverImage} {
    filter: grayscale(0);
  }

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 120px;
    margin-bottom: 0;

    &::before {
      content: none;
    }
  }
`;

export const ContentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const BookCoverWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const MobileContentName = styled.div`
  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
`;

export const NewCollectionWrapper = styled.div`
  width: 280px;
  height: 280px;
  padding: 20px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.shadow.light};
  border: 2px solid black;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 120px;
  }
`;

export const CollectionInputArea = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 70%;
  }
`;

export const CollectionNameInput = styled.input`
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  margin-top: 75px;
  border: 1px solid black;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 20px;
  }
`;

export const CreateCollectionButton = styled.button`
  padding: 20px;
  font-size: 2rem;
  height: 200px;
  cursor: pointer;
`;
