import { styled } from "styled-components";
import { FaRegPenToSquare } from "react-icons/fa6";
import Publisher from "../../ui/Publisher";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "@/ui/Modal";
import { useState } from "react";
import { ButtonMd } from "@/styles/common.styled";

const Wrapper = styled.section`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3``;

const ImageWrapper = styled.div`
  width: 200px;
  min-width: 12.5rem;
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  min-width: 12.5rem;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 8px;
  margin-top: 13px;
`;

const Rating = styled.div`
  width: 200px;
  min-width: 12.5rem;
  margin-top: 21px;
  font-size: 1.313rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 13px;
  margin-top: 40px;
`;

const AnalyzeContent = styled.article`
  width: 600px;
  min-width: 37.5rem;
  min-height: 18.75rem;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div`
  background-color: transparent;
  font-size: 1.125rem;
  cursor: pointer;
`;

const EmptyContent = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  min-height: 9.375rem;
  color: ${(props) => props.theme.colors.gray5};
  font-size: 0.938rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 10px;
  position: relative;
`;

const Menu = styled.div`
  padding: 10px;
  width: 90px;
  min-width: 5.625rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  position: absolute;
  text-align: center;
  border-radius: 8px;
  top: 40px;
  right: 5px;
  display: none;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    background-color: ${(props) => props.theme.colors.white};
    width: 10px;
    height: 10px;
    top: -5px;
    transform: rotate(45deg);
    right: 10%;
  }
`;

const ButtonInput = styled.input`
  display: none;

  &:checked ~ ${Menu} {
    display: block;
  }
`;

const ButtonLabel = styled.label`
  display: block;
  width: 40px;
  height: 30px;
  text-align: center;
  padding: 5px;
  position: relative;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    font-size: ${(props) => props.theme.fonts.size600};
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalCloseButton = styled(ButtonMd)`
  color: ${(props) => props.theme.colors.gray6};
  background-color: ${(props) => props.theme.colors.gray4};
`;

interface Data {
  title: string;
  placeholder: string;
}

const Tracker = () => {
  const analyzeContentData: Data[] = [
    {
      title: "1. 무엇을 다룬 책인지 알아내기",
      placeholder: "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요.",
    },
    {
      title: "2. 내용 해석하기",
      placeholder:
        "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요.",
    },
    {
      title: "3. 비평하기",
      placeholder:
        "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요.",
    },
  ];

  const [isModalOpened, setIsModalOpened] = useState(false);

  const onCloseModal = () => {
    setIsModalOpened(false);
  };

  const onOpenModal = () => {
    setIsModalOpened(true);
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <ButtonInput type="checkbox" id="trigger" />
        <ButtonLabel htmlFor="trigger">
          <BsThreeDotsVertical />
        </ButtonLabel>
        <Menu>
          <DeleteButton onClick={onOpenModal}>삭제하기</DeleteButton>
        </Menu>
      </ButtonWrapper>
      <Title>절망하는 이들을 위한 민주주의 </Title>
      <Publisher author="최태현 (지은이)" publisher="창비" date="2023.09.08" />
      <ImageWrapper>
        <Image src="https://image.yes24.com/goods/122339211/XL" />
        <Rating>⭐⭐⭐⭐⭐</Rating>
      </ImageWrapper>
      <ContentWrapper>
        {analyzeContentData.map((content, index) => (
          <AnalyzeContent key={index}>
            <ContentTitle>
              <h4>{content.title}</h4>
              <ModifyButton>
                <FaRegPenToSquare />
              </ModifyButton>
            </ContentTitle>
            <EmptyContent>{content.placeholder}</EmptyContent>
          </AnalyzeContent>
        ))}
      </ContentWrapper>
      {isModalOpened && (
        <Modal $innerHeight="fit-content" $innerWidth="330px" onClose={onCloseModal}>
          <ModalWrapper>
            <div>정말 삭제하시겠습니까?</div>
            <ModalButtonWrapper>
              <ButtonMd>삭제</ButtonMd>
              <ModalCloseButton onClick={onCloseModal}>취소</ModalCloseButton>
            </ModalButtonWrapper>
          </ModalWrapper>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Tracker;
