import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { BookList } from "../shared/index.ts";
import BookListSkeleton from "@/ui/BookListSkeleton.tsx";
import SearchBar from "../mainPageContent/SearchBar.tsx";
import RefetchProvider from "@/api/contextProviders/RefetchProvider.tsx";
import ParamContextProvider from "@/api/contextProviders/CollectionParamProvider.tsx";
import { useEffect, useState } from "react";
import { useCollection } from "@/hooks/queries/index.ts";
import { motion } from "framer-motion";

const Wrapper = styled(motion.section)`
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
  const { collection, isCollectionLoading, collectionRefetch } = useCollection({
    name: name,
  });

  useEffect(() => {
    if (params.name) {
      setIsCollection(true);
    }
  }, [params.name]);

  if (isCollectionLoading) {
    return <BookListSkeleton />;
  }

  return (
    <Wrapper
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      <Title>{name}</Title>
      <RefetchProvider refetch={collectionRefetch}>
        <ParamContextProvider
          collectionParam={{ isCollection: isCollection, name: name }}
        >
          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>
          <BookList books={collection} />
        </ParamContextProvider>
      </RefetchProvider>
    </Wrapper>
  );
};

export default Details;
