import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

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
  const onChaneQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };
  const onOpenAddNewCollection = () => {
    setIsAddNewCollection(true);
  };
  const onCloseAddNewCollection = () => {
    setIsAddNewCollection(false);
  };

  return (
    <Wrapper>
      <ItemWrapper
        $collectionName="한강"
        onClick={() => navigate(`${encodeURIComponent("한강")}`)}
      >
        <Image src="https://image.aladin.co.kr/product/4086/97/cover500/8936434128_2.jpg" />
        <Image src="https://image.aladin.co.kr/product/27877/5/cover500/8954682154_3.jpg" />
        <Image src="https://image.aladin.co.kr/product/29137/2/cover500/8936434594_2.jpg" />
        <Image src="https://image.aladin.co.kr/product/14322/3/cover500/8954651135_3.jpg" />
      </ItemWrapper>
      <ItemWrapper $collectionName="test2">MainContent2</ItemWrapper>
      <ItemWrapper $collectionName="test3">MainContent3</ItemWrapper>
      <ItemWrapper $collectionName="test4">MainContent4</ItemWrapper>
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
            />
          </InputWrapper>
        ) : (
          <AddButton data-testId="addBtn" onClick={onOpenAddNewCollection}>
            새로 추가하기
          </AddButton>
        )}
      </AddItem>
    </Wrapper>
  );
};

export default MainContent;
