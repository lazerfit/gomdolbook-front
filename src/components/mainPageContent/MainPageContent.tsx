import { useState } from "react";
import { styled } from "styled-components";
import Banner from "./Banner.tsx";
import SearchBar from "./SearchBar.tsx";
import EmptyLibraryBanner from "./EmptyLibraryBanner.tsx";
import BookList from "./BookList.tsx";
import MainpageSkeleton from "@/ui/MainpageSkeleton.tsx";
import { useKeycloak } from "@react-keycloak/web";

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
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <MainpageSkeleton />;
  }

  return (
    <Wrapper>
      {isLibraryEmpty ? (
        <EmptyLibraryBanner />
      ) : (
        <>
          <Banner />
          <SearchBar />
          <BookList data={undefined} />
        </>
      )}
    </Wrapper>
  );
};

export default MainContent;
