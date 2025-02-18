import { useState } from "react";
import { styled } from "styled-components";
import SortBar from "./StatusNavBar.tsx";
import BookList from "../mainPageContent/BookList.tsx";
import { useGetLibrary } from "@/hooks/queries/useBook.ts";
import BookListSkeleton from "@/ui/BookListSkeleton.tsx";

const Wrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyLibrary = () => {
  const [filter, setfilter] = useState("READING");
  const { data, isLoading } = useGetLibrary(filter);

  return (
    <Wrapper>
      <SortBar setFilter={setfilter} />
      {isLoading ? <BookListSkeleton /> : <BookList data={data} />}
    </Wrapper>
  );
};

export default MyLibrary;
