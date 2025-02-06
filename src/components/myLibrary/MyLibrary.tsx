import { styled } from "styled-components";
import SortBar from "./StatusNavBar.tsx";
import BookList from "../mainPageContent/BookList.tsx";

const Wrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyLibrary = () => {
  return (
    <Wrapper>
      <SortBar />
      <BookList />
    </Wrapper>
  );
};

export default MyLibrary;
