import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import Toast from "../../ui/Toast.tsx";
import Publisher from "../../ui/Publisher.tsx";
import { useGetBookQuery } from "@/hooks/queries/useBook.ts";
import { BookStatus } from "@/api/services/BoookService.ts";
import { useGetStatus } from "@/hooks/queries/useReadingLog.ts";
import BookDetailSkeleton from "@/ui/BookDetailSkeleton.tsx";
import BookDetailButtonActions from "@/ui/BookDetailButtonActions.tsx";

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
  width: 500px;
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
  width: 500px;
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

interface Props {
  isbn: string;
  onClose: () => void;
}

const BookDetails = (props: Props) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);
  const { data: aladin, isError, error, isLoading } = useGetBookQuery(props.isbn);
  if (isError) {
    console.log(error);
  }

  const aladinData = aladin?.data ?? {
    title: "default title",
    author: "default author",
    pubDate: "default pubDate",
    description: "default description",
    isbn13: "default isbn13",
    cover: "default cover",
    categoryName: "default categoryName",
    publisher: "default publisher",
    status: BookStatus.TO_READ,
  };
  const onShowToast = () => {
    setIsToastVisible(true);
    setIsErrorToast(false);
  };
  const onShowErrorToast = () => {
    setIsErrorToast(true);
  };
  const onCloseToast = () => {
    setIsToastVisible(false);
  };

  return (
    <Wrapper>
      <BackButton data-testid="backBtn" onClick={props.onClose}>
        <FaArrowLeft style={{ fontSize: "20px" }} />
      </BackButton>
      <MainContentWrapper>
        {isLoading ? (
          <BookDetailSkeleton />
        ) : (
          <>
            <Image src={aladinData.cover} />
            <BasicInformation>
              <Title>{aladinData.title}</Title>
              <Publisher
                author={aladinData.author ?? "author"}
                publisher={aladinData.publisher ?? "publisher"}
                date={aladinData.pubDate ?? "pubDate"}
              />
              <SubInfomation>
                <div style={{ fontWeight: "bold" }}>기본정보</div>
                <div>ISBN : {aladinData.isbn13}</div>
                <div>카테고리 : {aladinData.categoryName}</div>
              </SubInfomation>
            </BasicInformation>
            <Description>
              <div style={{ fontWeight: "bold" }}>책 소개</div>
              <div>{aladinData.description}</div>
            </Description>
            <ButtonWrapper>
              <BookDetailButtonActions
                isbn={props.isbn}
                bookData={aladinData}
                showToast={() => onShowToast()}
                showErrorToast={() => onShowErrorToast}
              />
            </ButtonWrapper>
          </>
        )}
      </MainContentWrapper>
      <Toast
        isVisible={isToastVisible}
        isError={isErrorToast}
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
