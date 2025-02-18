import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import CollectionSkeleton from "@/ui/CollectionSkeleton.tsx";
import { useGetListQuery, useCreateQuery } from "@/hooks/queries/useCollection.ts";
import { useKeycloak } from "@react-keycloak/web";

const Wrapper = styled.section`
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
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  cursor: pointer;
  position: relative;

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
  border-radius: 8px;
  padding: 20px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
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

const AddButton = styled.button`
  padding: 20px;
  font-size: 2rem;
  height: 200px;
  cursor: pointer;
`;

const MainContent = () => {
  const navigate = useNavigate();
  const [isAddNewCollection, setIsAddNewCollection] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const { data: listData, isLoading } = useGetListQuery();
  const { mutate: createCollection } = useCreateQuery();
  const { initialized } = useKeycloak();
  const collectionList = listData?.data ?? [];

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
          setIsAddNewCollection(false);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (!initialized && isLoading) {
    return <CollectionSkeleton />;
  }

  return (
    <Wrapper>
      {collectionList.map((collection) => (
        <ItemWrapper
          key={collection.name}
          $collectionName={collection.name}
          onClick={() => navigate(`${encodeURIComponent(collection.name)}`)}
        >
          {collection.books.covers.map((cover, index) => (
            <Image src={cover} key={index} alt="책 표지" />
          ))}
        </ItemWrapper>
      ))}
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
    </Wrapper>
  );
};

export default MainContent;
