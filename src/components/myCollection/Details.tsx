import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { BookList } from "../shared/index.ts";
import BookListSkeleton from "@/ui/BookListSkeleton.tsx";
import SearchBar from "../mainPageContent/SearchBar.tsx";
import RefetchProvider from "@/api/contextProviders/RefetchProvider.tsx";
import ParamContextProvider from "@/api/contextProviders/CollectionParamProvider.tsx";
import { useEffect, useState } from "react";
import { useCollection } from "@/hooks/queries/index.ts";
import { motion } from "framer-motion";
import ThreeDotMenu from "@/ui/ThreeDotMenu.tsx";

const Wrapper = styled(motion.section)`
  margin-top: 34px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  text-align: center;
  text-shadow: ${(props) => props.theme.shadow.text};
  margin-left: auto;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Details = () => {
  const params = useParams();
  const name = params.name ?? "";
  const navigate = useNavigate();
  const [isCollection, setIsCollection] = useState(false);
  const {
    collection,
    isCollectionLoading,
    collectionRefetch,
    deleteCollection,
    isDeleteCollectionPending,
    collectionListRefetch,
  } = useCollection({
    name: name,
  });

  const onRemove = () => {
    deleteCollection(void 0, {
      onSuccess: () => {
        collectionListRefetch()
          .then(() => navigate("/collections"))
          .catch((error) => console.log("list refetch error", error));
      },
      onError: (error) => console.log("remove error", error),
    });
  };

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
      <TitleWrapper>
        <Title>{name}</Title>
        <ThreeDotMenu onRemove={onRemove} isLoading={isDeleteCollectionPending} />
      </TitleWrapper>
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
