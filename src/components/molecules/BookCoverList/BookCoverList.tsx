import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import { motion } from 'framer-motion';
import { BounceInDownStates } from '@/utils/variables';
import { BookCoverListSkeleton } from '@/components/molecules/SkeletonLoader';

const Wrapper = styled(motion.div)`
  ${mixins.flexCenter};
  flex-direction: row;
  width: 100%;
  margin-top: var(--space-6);
  gap: var(--space-4);

  ${mediaMax.mobile} {
    width: 20%;
    margin-top: var(--space-half);
  }
`;

const BookCover = styled(motion.img)`
  cursor: pointer;
  filter: grayscale(1);
  transition: filter 0.2s;
  width: 12.5rem;
  height: auto;
  border-radius: var(--radius-sm);
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
  isLoading: boolean;
  onCoverClick: (isbn: string, readingLogId?: number) => void;
}

const BookCoverList = ({ books, isLoading, onCoverClick }: BookCoverListProps) => {
  const handleClick = (isbn: string, id?: number) => {
    if (id !== undefined) {
      onCoverClick(isbn, id);
    } else {
      onCoverClick(isbn);
    }
  };

  if (!books || isLoading) {
    return <BookCoverListSkeleton />;
  }

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
