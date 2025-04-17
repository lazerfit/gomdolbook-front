import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { CollectionSkeletonLoader } from "@/ui/index.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useCollection } from "@/hooks/index.ts";
import * as S from "./CollectionListView.styles.ts";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.js";

const CollectionListView = () => {
  const navigate = useNavigate();
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [inputText, setInputText] = useState("");
  const { initialized } = useKeycloak();
  const { isMobile } = useMediaBreakpoints();
  const {
    collectionList,
    isCollectionListLoading,
    collectionListRefetch,
    createCollection,
  } = useCollection();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const openNewCollectionMode = () => {
    setIsCreatingCollection(true);
  };
  const closeNewCollectionMode = () => {
    setIsCreatingCollection(false);
  };
  const handleSubmitOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputText.trim() !== "" && event.key === "Enter") {
      createCollection(inputText, {
        onSuccess: () => {
          collectionListRefetch()
            .then(() => setIsCreatingCollection(false))
            .catch((error) => console.log(error));
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (!initialized || isCollectionListLoading) {
    return <CollectionSkeletonLoader />;
  }

  return (
    <S.CollectionWrapper
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      <S.NewCollectionWrapper>
        {isCreatingCollection ? (
          <S.CollectionInputArea>
            <FaArrowLeft
              style={{ fontSize: "24px", cursor: "pointer", color: "#adb5bd" }}
              onClick={closeNewCollectionMode}
            />
            <S.CollectionNameInput
              type="text"
              placeholder="이름을 입력하세요"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleSubmitOnEnter}
            />
          </S.CollectionInputArea>
        ) : (
          <S.CreateCollectionButton data-testid="addBtn" onClick={openNewCollectionMode}>
            새로 추가하기
          </S.CreateCollectionButton>
        )}
      </S.NewCollectionWrapper>
      {collectionList.map((collection) => (
        <S.CollectionCard
          key={collection.name}
          $collectionName={collection.name}
          onClick={() => navigate(`${encodeURIComponent(collection.name)}`)}
        >
          <S.MobileContentCardWrapper>
            <S.MobileBookCoverWrapper>
              {collection.books.covers.slice(0, 4).map((cover, index) => (
                <S.BookCoverImage src={cover} key={index} alt="책 표지" />
              ))}
            </S.MobileBookCoverWrapper>
            {isMobile && <S.MobileContentName>{collection.name}</S.MobileContentName>}
          </S.MobileContentCardWrapper>
        </S.CollectionCard>
      ))}
    </S.CollectionWrapper>
  );
};

export default CollectionListView;
