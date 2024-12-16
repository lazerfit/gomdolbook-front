import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 48px;
`;

const ContentWrapper = styled.article`
  width: 280px;
  height: 410px;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  cursor: pointer;

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

const BookList = () => {
  const navigate = useNavigate();
  const testId = 123456789101;
  return (
    <Wrapper>
      <ContentWrapper>
        <Image
          src="https://image.yes24.com/goods/122339211/XL"
          alt="책 표지"
          onClick={() => navigate(`/books/${testId}`)}
        />
        <Title>절망하는 이들을 위한 민주주의</Title>
        <Rating>⭐⭐⭐⭐⭐</Rating>
      </ContentWrapper>
    </Wrapper>
  );
};

export default BookList;
