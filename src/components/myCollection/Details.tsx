import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import BookList from "../mainPageContent/BookList.tsx";

const Wrapper = styled.div`
  margin-top: 34px;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  text-align: center;
`;

const Details = () => {
  const params = useParams();

  return (
    <Wrapper>
      <Title>{params.name}</Title>
      <BookList />
    </Wrapper>
  );
};

export default Details;
