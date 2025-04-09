import { useNavigate } from "react-router-dom";
import type { ILibraryResponse } from "@/api/services/BoookService.ts";
import { Modal } from "@/ui/index.ts";
import { useState } from "react";
import { BookDetail } from "./index.ts";

import ImageMotion from "@/ui/frameMotion/ImageMotion.tsx";
import { useKeycloak } from "@react-keycloak/web";
import * as S from "./BookListView.styles.ts";

interface Props {
  bookList: ILibraryResponse[];
}

const BookListView = ({ bookList }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isbn, setIsbn] = useState("");
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const handleNavigateOrOpenModal = (book: ILibraryResponse) => {
    if (book.status === "NEW" || book.status === "TO_READ") {
      setIsbn(book.isbn);
      setIsModalOpened(true);
    } else {
      navigate(`/readingLog/${book.isbn}`);
    }
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };
  return (
    <S.BookWrapper>
      {bookList.length === 0 ? (
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
        bookList.map((book) => (
          <S.BookContentWrapper key={book.isbn}>
            <S.BookCover
              src={book.cover}
              alt="책 표지"
              onClick={() => handleNavigateOrOpenModal(book)}
            />
            <S.BookTitle>{book.title}</S.BookTitle>
          </S.BookContentWrapper>
        ))
      )}
      {isModalOpened && (
        <Modal innerWidth="900px" innerHeight="80%" onClose={closeModal}>
          <BookDetail isbn={isbn} onClose={closeModal} />
        </Modal>
      )}
    </S.BookWrapper>
  );
};

export default BookListView;
