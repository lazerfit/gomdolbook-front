import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import type { ILibraryResponse } from "@/api/services/BoookService.ts";
import { Modal } from "@/ui/index.ts";
import { useState } from "react";
import { BookDetail } from "./index.ts";
import { motion } from "framer-motion";
import ImageMotion from "@/ui/frameMotion/ImageMotion.tsx";
import { useKeycloak } from "@react-keycloak/web";

const BookWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 45px;
  margin-top: 32px;
`;

const BookContentWrapper = styled.article`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
`;

const BookCover = styled.img`
  width: 200px;
  filter: grayscale(100%);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadow.light};

  &:hover {
    filter: none;
  }
`;

const BookTitle = styled.h5`
  margin-top: 21px;
`;

const EmptyLibraryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex-direction: column;
`;

const EmptyLibraryBanner = styled(motion.div)`
  font: ${(props) => props.theme.fonts.title};
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.title};
  line-height: 1;
  text-shadow: ${(props) => props.theme.shadow.text};
`;

interface Props {
  books: ILibraryResponse[];
}

const BookListView = ({ books }: Props) => {
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
    <BookWrapper>
      {books.length === 0 ? (
        <EmptyLibraryWrapper>
          <EmptyLibraryBanner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            책을 추가해 독서기록을 시작해보세요.
          </EmptyLibraryBanner>
          {!keycloak.authenticated && <ImageMotion />}
        </EmptyLibraryWrapper>
      ) : (
        books.map((book) => (
          <BookContentWrapper key={book.isbn}>
            <BookCover
              src={book.cover}
              alt="책 표지"
              onClick={() => handleNavigateOrOpenModal(book)}
            />
            <BookTitle>{book.title}</BookTitle>
          </BookContentWrapper>
        ))
      )}
      {isModalOpened && (
        <Modal innerWidth="900px" innerHeight="80%" onClose={closeModal}>
          <BookDetail isbn={isbn} onClose={closeModal} />
        </Modal>
      )}
    </BookWrapper>
  );
};

export default BookListView;
