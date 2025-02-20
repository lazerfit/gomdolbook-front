import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import BookList from "../mainPageContent/BookList.tsx";
import SearchBar from "../mainPageContent/SearchBar.tsx";

const Wrapper = styled.div`
  margin-top: 34px;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  text-align: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Details = () => {
  const params = useParams();

  return (
    <Wrapper>
      <Title>{params.name}</Title>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <BookList data={{ data: [] }} />
    </Wrapper>
  );
};

export default Details;
