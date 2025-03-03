import { useEffect, useState } from "react";
import { styled } from "styled-components";
import StatusNavBar from "./StatusNavBar.tsx";
import { BookList } from "../shared/index.ts";
import { useGetLibrary } from "@/hooks/queries/useBook.ts";
import { BookListSkeleton } from "@/ui/index.ts";
import { useParams } from "react-router-dom";

const Wrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyLibrary = () => {
  const params = useParams();
  const status = params.status ?? "";
  const [filter, setfilter] = useState(status);
  const { data, isLoading } = useGetLibrary(filter);

  useEffect(() => {
    if (status !== "") {
      setfilter(status);
    }
  }, [status]);

  return (
    <Wrapper>
      <StatusNavBar />
      {isLoading ? <BookListSkeleton /> : <BookList data={data} />}
    </Wrapper>
  );
};

export default MyLibrary;
