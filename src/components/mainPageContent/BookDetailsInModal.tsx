import { useState } from "react";
import { styled } from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import Toast from "../../ui/Toast";
import Publisher from "../../ui/Publisher";
import { ButtonMd } from "@/styles/common.styled";

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 20px;
  padding-left: 30px;
  background-color: transparent;
  cursor: pointer;
`;

const MainContentWrapper = styled.div`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px;
`;

const BasicInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 34px;
`;

const Image = styled.img`
  width: 150px;
  min-width: 9.375rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const Title = styled.h3`
  overflow: break-world;
  font-weight: 700;
`;

const SubInfomation = styled.div`
  font-size: 0.938rem;
  margin-top: 21px;
  display: flex;
  flex-direction: column;

  > div:nth-child(1) {
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  font-size: 0.938rem;
  margin-top: 21px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 500px;
  min-width: 31.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 13px;
  margin: 34px auto;
`;

const SaveButton = styled(ButtonMd)`
  border: 2px solid ${(porps) => porps.theme.colors.black};
  position: relative;
  overflow: hidden;
  padding: 7px 20px;

  > p {
    position: relative;
    font-size: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    background-color: red;
    border-radius: 20px;
    top: 0;
    left: 0;
  }

  &:nth-child(1)::before {
    background-color: #acd7ec;
  }

  &:nth-child(2)::before {
    background-color: #f4989c;
  }

  &:nth-child(3)::before {
    background-color: #4ea699;
  }

  &:hover::before {
    content: "";
    width: 100%;
    transition: 0.5s;
  }
`;

interface Props {
  onClose: () => void;
}

const BookDetails = (props: Props) => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const onShowToast = () => {
    setIsToastVisible(true);
  };

  const onCloseToast = () => {
    setIsToastVisible(false);
  };

  return (
    <Wrapper>
      <BackButton onClick={props.onClose}>
        <FaArrowLeft style={{ fontSize: "20px" }} />
      </BackButton>
      <MainContentWrapper>
        <Image src="https://image.yes24.com/goods/122339211/XL" />
        <BasicInformation>
          <Title>절망하는 이들을 위한 민주주의</Title>
          <Publisher author="최태현 (지은이)" publisher="창비" date="2023.09.08" />
          <SubInfomation>
            <div style={{ fontWeight: "bold" }}>기본정보</div>
            <div>ISBN : 9788936479428</div>
            <div>페이지 수 : 416</div>
            <div>카테고리 : 국내도서.사회과학.사회사상/사회사상사.민주주의</div>
          </SubInfomation>
        </BasicInformation>
        <Description>
          <div style={{ fontWeight: "bold" }}>책 소개</div>
          <div>
            고통받는 약자들의 목소리는 여전히 작고 힘이 없다. 더군다나 이런 문제를 우리의
            제도로는 해결할 수 없을뿐더러 오히려 제도가 그런 비극의 원인이 되기도 한다는
            점이 절망스럽기도 하다. 희망을 어디에서 찾을 수 있을까?
          </div>
        </Description>
        <ButtonWrapper>
          <SaveButton onClick={onShowToast}>
            <p>읽는 중</p>
          </SaveButton>
          <SaveButton onClick={onShowToast}>
            <p>읽을 예정</p>
          </SaveButton>
          <SaveButton onClick={onShowToast}>
            <p>읽기 완료</p>
          </SaveButton>
        </ButtonWrapper>
      </MainContentWrapper>
      <Toast
        isVisible={isToastVisible}
        isError={false}
        onChangeVisibility={onCloseToast}
        message={{
          success: "내 서재에 성공적으로 저장하였어요.",
          error: "다시 시도해주세요.",
        }}
      />
    </Wrapper>
  );
};

export default BookDetails;
