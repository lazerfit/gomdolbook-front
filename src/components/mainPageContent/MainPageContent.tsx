import { styled } from "styled-components";
import Banner from "./Banner.tsx";
import SearchBar from "./SearchBar.tsx";
import { BookList } from "../shared/index.ts";
import { MainpageSkeleton } from "@/ui/index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useBook } from "@/hooks/queries/index.ts";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 55px auto 0 auto;
  align-items: center;
  min-height: calc(100vh - 410px);
`;

const MainContent = () => {
  const { initialized } = useKeycloak();
  const { library, isLibraryLoading } = useBook({ status: "READING" });

  if (!initialized || isLibraryLoading) {
    return <MainpageSkeleton />;
  }

  return (
    <Wrapper>
      <Banner />
      <SearchBar />
      <BookList books={library} />
    </Wrapper>
  );
};

export default MainContent;
