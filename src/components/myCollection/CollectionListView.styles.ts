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
`;

export const BookCoverImage = styled.img`
  width: 80px;
  border-radius: 8px;
  filter: grayscale(1);
  transition: 0.5s;
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
`;

export const CollectionInputArea = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CollectionNameInput = styled.input`
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  margin-top: 75px;
  border: 1px solid black;
`;

export const CreateCollectionButton = styled.button`
  padding: 20px;
  font-size: 2rem;
  height: 200px;
  cursor: pointer;
`;
