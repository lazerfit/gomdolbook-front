import { useContext, useState } from "react";
import { styled } from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import { BookDetailSkeleton, Toast, Publisher, ThreeDotMenu } from "@/ui/index.ts";
import BookDetailButtonActions from "@/components/myCollection/ui/button/BookDetailButtonActions.tsx";
import { ParamContext } from "@/api/contextProviders/contexts/collectionParamContext.ts";
import { RefetchContext } from "@/api/contextProviders/contexts/refetchContext.ts";
import { useBook, useCollection, useReadingLog } from "@/hooks/queries/index.ts";
import { Item } from "@/ui/ThreeDotMenu.tsx";
import { itemVariants } from "@/ui/frameMotion/variants.ts";

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavButtonWrapper = styled.div`
  display: flex;
  align-items: center;
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

const BookDetails = ({ isbn = "", onClose }: Props) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);
  const { book, isBookLoading } = useBook({ isbn: isbn });
  const { removeBook, isRemoveBookPending } = useCollection();
  const { status, statusRefetch, makeUpdatable } = useReadingLog({
    statusIsbn: isbn,
  });
  const { name } = useContext(ParamContext);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);

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

  const onRemoveBook = () => {
    removeBook(
      { isbn: book.isbn13, name: name },
      {
        onSuccess: () => {
          Promise.all([
            collectionBookListRefetch().catch((error) =>
              console.log("list refetch error:", error),
            ),
            statusRefetch().catch((error) => console.log("status refetch error:", error)),
          ])
            .then(() => onClose())
            .catch((error) => console.log(error));
        },
        onError: (error) => console.log("removeBook error", error),
      },
    );
  };

  return (
    <Wrapper>
      <NavButtonWrapper>
        <BackButton data-testid="backBtn" onClick={onClose}>
          <FaArrowLeft style={{ fontSize: "20px" }} />
        </BackButton>
        {status !== "EMPTY" && status !== "NEW" && (
          <ThreeDotMenu onRemove={onRemoveBook} isLoading={isRemoveBookPending}>
            <Item variants={itemVariants} onClick={makeUpdatable}>
              상태변경
            </Item>
          </ThreeDotMenu>
        )}
      </NavButtonWrapper>
      <MainContentWrapper>
        {isBookLoading ? (
          <BookDetailSkeleton />
        ) : (
          <>
            <Image src={book.cover} />
            <BasicInformation>
              <Title>{book.title}</Title>
              <Publisher
                author={book.author}
                publisher={book.publisher}
                date={book.pubDate}
                align="flex-start"
              />
              <SubInfomation>
                <div style={{ fontWeight: "bold" }}>기본정보</div>
                <div>ISBN : {book.isbn13}</div>
                <div>카테고리 : {book.categoryName}</div>
              </SubInfomation>
            </BasicInformation>
            <Description>
              <div style={{ fontWeight: "bold" }}>책 소개</div>
              <div>{book.description}</div>
            </Description>
            <ButtonWrapper>
              <BookDetailButtonActions
                bookData={book}
                statusRefetch={statusRefetch}
                status={status}
                showToast={() => onShowToast()}
                showErrorToast={() => onShowErrorToast()}
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
