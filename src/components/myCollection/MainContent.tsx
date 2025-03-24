import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { CollectionSkeleton } from "@/ui/index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useCollection } from "@/hooks/queries/index.ts";
import { motion } from "framer-motion";

const Wrapper = styled(motion.section)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 32px;
  gap: 20px;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 80px;
  border-radius: 8px;
  filter: grayscale(1);
  transition: 0.5s;
`;

interface IName {
  $collectionName: string;
}

const ItemWrapper = styled.div<IName>`
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

  &:hover > ${Image} {
    filter: grayscale(0);
  }
`;

const AddItem = styled.div`
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

const InputWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const NewCollectionInput = styled.input`
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  margin-top: 75px;
  border: 1px solid black;
`;

export const AddButton = styled.button`
  padding: 20px;
  font-size: 2rem;
  height: 200px;
  cursor: pointer;
`;

const MainContent = () => {
  const navigate = useNavigate();
  const [isAddNewCollection, setIsAddNewCollection] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const { initialized } = useKeycloak();
  const {
    collectionList,
    isCollectionListLoading,
    collectionListRefetch,
    createCollection,
  } = useCollection();

  const onChaneQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };
  const onOpenAddNewCollection = () => {
    setIsAddNewCollection(true);
  };
  const onCloseAddNewCollection = () => {
    setIsAddNewCollection(false);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputQuery.trim() !== "" && event.key === "Enter") {
      createCollection(inputQuery, {
        onSuccess: () => {
          collectionListRefetch()
            .then(() => setIsAddNewCollection(false))
            .catch((error) => console.log(error));
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (!initialized || isCollectionListLoading) {
    return <CollectionSkeleton />;
  }

  return (
    <Wrapper
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      <AddItem>
        {isAddNewCollection ? (
          <InputWrapper>
            <FaArrowLeft
              style={{ fontSize: "24px", cursor: "pointer", color: "#adb5bd" }}
              onClick={onCloseAddNewCollection}
            />
            <NewCollectionInput
              type="text"
              placeholder="이름을 입력하세요"
              value={inputQuery}
              onChange={onChaneQuery}
              onKeyDown={onKeyDown}
            />
          </InputWrapper>
        ) : (
          <AddButton data-testid="addBtn" onClick={onOpenAddNewCollection}>
            새로 추가하기
          </AddButton>
        )}
      </AddItem>
      {collectionList.map((collection) => (
        <ItemWrapper
          key={collection.name}
          $collectionName={collection.name}
          onClick={() => navigate(`${encodeURIComponent(collection.name)}`)}
        >
          {collection.books.covers.slice(0, 4).map((cover, index) => (
            <Image src={cover} key={index} alt="책 표지" />
          ))}
        </ItemWrapper>
      ))}
    </Wrapper>
  );
};

export default MainContent;
