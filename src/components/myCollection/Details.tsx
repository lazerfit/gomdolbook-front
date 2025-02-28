import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { BookList } from "../shared/index.ts";
import BookListSkeleton from "@/ui/BookListSkeleton.tsx";
import SearchBar from "../mainPageContent/SearchBar.tsx";
import { useGetOneQuery } from "@/hooks/queries/useCollection.ts";
import RefetchProvider from "@/api/contextProviders/RefetchProvider.tsx";
import ParamContextProvider from "@/api/contextProviders/CollectionParamProvider.tsx";
import { useEffect, useState } from "react";

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
  const name = params.name ?? "";
  const [isCollection, setIsCollection] = useState(false);
  const { data: collectonList, isLoading, isError, refetch } = useGetOneQuery(name);

  useEffect(() => {
    if (params.name) {
      setIsCollection(true);
    }
  }, [params.name]);

  if (isLoading) {
    return <BookListSkeleton />;
  }

  return (
    <Wrapper>
      <Title>{name}</Title>
      <RefetchProvider refetch={refetch}>
        <ParamContextProvider
          collectionParam={{ isCollection: isCollection, name: name }}
        >
          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>
          {isError ? <BookList data={{ data: [] }} /> : <BookList data={collectonList} />}
        </ParamContextProvider>
      </RefetchProvider>
    </Wrapper>
  );
};

export default Details;
