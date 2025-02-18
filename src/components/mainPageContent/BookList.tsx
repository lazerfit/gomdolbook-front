import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import type { IApiResponse, ILibraryResponse } from "@/api/services/BoookService.ts";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 45px;
  margin-top: 32px;
`;

const ContentWrapper = styled.article`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
`;

const Image = styled.img`
  width: 200px;
  border-radius: 8px;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;

  &:hover {
    filter: none;
  }
`;

const Title = styled.h5`
  margin-top: 21px;
`;

const Rating = styled.div`
  margin-top: 8px;
`;

const EmptyLibraryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const EmptyLibraryBanner = styled.div`
  font: ${(props) => props.theme.fonts.title};
  font-size: 3rem;
`;

interface Props {
  data: void | IApiResponse<ILibraryResponse[]> | undefined;
}

const BookList = (props: Props) => {
  const navigate = useNavigate();
  const books = props.data?.data ?? [];
  return (
    <Wrapper>
      {books.length === 0 ? (
        <EmptyLibraryWrapper>
          <EmptyLibraryBanner>책을 추가해 독서기록을 시작해보세요.</EmptyLibraryBanner>
        </EmptyLibraryWrapper>
      ) : (
        books.map((book) => (
          <ContentWrapper key={book.isbn}>
            <Image
              src={book.cover}
              alt="책 표지"
              onClick={() => navigate(`/books/${book.isbn}`)}
            />
            <Title>{book.title}</Title>
            <Rating>⭐⭐⭐⭐⭐</Rating>
          </ContentWrapper>
        ))
      )}
    </Wrapper>
  );
};

export default BookList;
