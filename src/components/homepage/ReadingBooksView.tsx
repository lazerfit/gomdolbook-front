import { styled } from "styled-components";
import SearchBar from "./SearchBar.tsx";
import { BookListView } from "../book/index.ts";
import { IndexPageSkeletonLoader } from "@/ui/index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useBook } from "@/hooks/index.ts";
import { useEffect, useState } from "react";

const ReadingBooksWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  min-height: calc(100vh - 220px);
`;

const ReadingBooksView = () => {
  const { initialized, keycloak } = useKeycloak();
  const [filter, setFilter] = useState("");
  const { libraryBookList, isLibraryBookListLoading } = useBook({ status: filter });

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setFilter("READING");
    }
  }, [keycloak, initialized]);

  if (!initialized || isLibraryBookListLoading) {
    return <IndexPageSkeletonLoader />;
  }

  return (
    <ReadingBooksWrapper>
      <SearchBar />
      <BookListView books={libraryBookList} />
    </ReadingBooksWrapper>
  );
};

export default ReadingBooksView;
