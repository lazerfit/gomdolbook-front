import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import { motion } from 'framer-motion';
import { BounceInDownStates } from '@/utils/variables';

const Wrapper = styled(motion.div)`
  ${mixins.flexCenter};
  flex-direction: row;
  width: 100%;
  margin-top: 5rem;
  gap: 2rem;

  ${mediaMax.mobile} {
    width: 20%;
    margin-top: 0.3rem;
  }
`;

const BookCover = styled(motion.img)`
  cursor: pointer;
  filter: grayscale(1);
  transition: filter 0.2s;
  width: 12.5rem;
  height: auto;
  border-radius: 0.3125rem;
  ${mixins.boxShadowLight};

  &:hover {
    filter: grayscale(0);
  }
`;

interface BooksProps {
  title: string;
  cover: string;
  isbn: string;
  readingLogId?: number;
}

interface BookCoverListProps {
  books: BooksProps[];
  onCoverClick: (isbn: string, readingLogId?: number) => void;
}

const BookCoverList = ({ books, onCoverClick }: BookCoverListProps) => {
  const handleClick = (isbn: string, id?: number) => {
    if (id !== undefined) {
      onCoverClick(isbn, id);
    } else {
      onCoverClick(isbn);
    }
  };

  return (
    <Wrapper>
      {books.map(book => (
        <BookCover
          layout
          variants={BounceInDownStates}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          key={book.isbn}
          src={book.cover}
          data-testid={`bookCover-${book.isbn}`}
          alt="bookCover"
          onClick={() => handleClick(book.isbn, book?.readingLogId)}
        />
      ))}
    </Wrapper>
  );
};

export default BookCoverList;
