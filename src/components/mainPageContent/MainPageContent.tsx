import { useState } from "react";
import { styled } from "styled-components";
import Banner from "./Banner.tsx";
import SearchBar from "./SearchBar.tsx";
import EmptyLibraryBanner from "./EmptyLibraryBanner.tsx";
import BookList from "./BookList.tsx";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 55px auto 0 auto;
  align-items: center;
  min-height: calc(100vh - 410px);
`;

const MainContent = () => {
  const [isLibraryEmpty] = useState(false);
  return (
    <Wrapper>
      {isLibraryEmpty ? (
        <EmptyLibraryBanner />
      ) : (
        <>
          <Banner />
          <SearchBar />
          <BookList />
        </>
      )}
    </Wrapper>
  );
};

export default MainContent;
