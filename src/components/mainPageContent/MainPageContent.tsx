import { styled } from "styled-components";
import SearchBar from "./SearchBar.tsx";
import { BookList } from "../shared/index.ts";
import { MainpageSkeleton } from "@/ui/index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useBook } from "@/hooks/index.ts";
import { useEffect, useState } from "react";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  min-height: calc(100vh - 220px);
`;

const MainContent = () => {
  const { initialized, keycloak } = useKeycloak();
  const [filter, setFilter] = useState("");
  const { library, isLibraryLoading } = useBook({ status: filter });

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setFilter("READING");
    }
  }, [keycloak, initialized]);

  if (!initialized || isLibraryLoading) {
    return <MainpageSkeleton />;
  }

  return (
    <Wrapper>
      <SearchBar />
      <BookList books={library} />
    </Wrapper>
  );
};

export default MainContent;
