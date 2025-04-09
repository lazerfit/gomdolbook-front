import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { BookListView } from "../components/book/index.ts";
import BookListSkeletonLoader from "@/ui/BookListSkeletonLoader.tsx";
import { SearchBar } from "@/components/homepage/index.ts";
import {
  RefetchProvider,
  CollectionParamProvider,
} from "@/api/contextProviders/index.ts";
import { useEffect, useState } from "react";
import { useCollection } from "@/hooks/index.ts";
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

const CollectionDetailPage = () => {
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

  const handleDeleteCollection = () => {
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
    return <BookListSkeletonLoader />;
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
        <ThreeDotMenu
          onRemove={handleDeleteCollection}
          isLoading={isDeleteCollectionPending}
        />
      </TitleWrapper>
      <RefetchProvider refetch={collectionRefetch}>
        <CollectionParamProvider
          collectionParam={{ isCollection: isCollection, name: name }}
        >
          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>
          <BookListView bookList={collection} />
        </CollectionParamProvider>
      </RefetchProvider>
    </Wrapper>
  );
};

export default CollectionDetailPage;
