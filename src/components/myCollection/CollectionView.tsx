import { useState } from "react";
import { CollectionBookMetaResponse } from "@/api/services/types/booktypes.ts";
import * as S from "../book/BookListView.styles.ts";
import ImageMotion from "@/ui/frameMotion/ImageMotion.js";
import { Modal } from "@/ui/index.js";
import { useKeycloak } from "@react-keycloak/web";
import CollectionBookMetaDetail from "@/components/myCollection/CollectionBookMetaDetail.tsx";

interface Props {
  collectionBookList: CollectionBookMetaResponse[];
}

const CollectionView = ({ collectionBookList }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isbn, setIsbn] = useState("");
  const { keycloak } = useKeycloak();

  const handleOpenModal = (book: CollectionBookMetaResponse) => {
    setIsbn(book.isbn);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <S.BookWrapper>
      {collectionBookList.length === 0 ? (
        <S.EmptyLibraryWrapper>
          <S.EmptyLibraryBanner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            책을 추가해 독서기록을 시작해보세요.
          </S.EmptyLibraryBanner>
          {!keycloak.authenticated && <ImageMotion />}
        </S.EmptyLibraryWrapper>
      ) : (
        collectionBookList.map((book) => (
          <S.BookContentWrapper key={book.isbn}>
            <S.BookCover
              src={book.cover}
              alt="책 표지"
              onClick={() => handleOpenModal(book)}
            />
            <S.BookTitle>{book.title}</S.BookTitle>
          </S.BookContentWrapper>
        ))
      )}
      {isModalOpened && (
        <Modal innerWidth="900px" innerHeight="80%" onClose={closeModal}>
          <CollectionBookMetaDetail isbn={isbn} onClose={closeModal} />
        </Modal>
      )}
    </S.BookWrapper>
  );
};

export default CollectionView;
