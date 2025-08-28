import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import type { BookResponse } from '@/api/services/types';
import { BookInformationBox } from '@/components/molecules/BookSearchResultItem';
import { BookCoverBig } from '@/components/atoms/BookCover';
import Divider from '@/components/atoms/Divider';

const Wrapper = styled.div`
  ${mixins.flexColumn};
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-half);
  width: 31rem;
  height: 100%;
`;

const BookTitle = styled.h2``;

const SubTitle = styled.h5`
  color: var(--secondary-text);
`;

const BookCover = styled(BookCoverBig)`
  margin-top: var(--space-2);
`;

const BookOverviewContainer = styled.div`
  width: 400px;
  margin-top: var(--space-6);
  border: 1px solid var(--border-color-1);
  border-radius: var(--radius-md);
  padding: var(--space-2);
  background-color: var(--white);
`;

const BookOverviewTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BookOverview = styled.p`
  margin-top: var(--space-2);
`;

const GreyDivider = styled(Divider)`
  height: 1px;
  background-color: var(--border-color-2);
`;

interface BookDetailsProps {
  book: BookResponse;
}

const BookInfo = ({ book }: BookDetailsProps) => {
  const [mainTitle, subTitle] = book.title.split('-', 2);

  return (
    <Wrapper>
      <BookTitle>{mainTitle}</BookTitle>
      <SubTitle>{subTitle}</SubTitle>
      <BookInformationBox
        author={book.author}
        publisher={book.publisher}
        publicationDate={book.pubDate}
        justifyContent="center"
      />
      <BookCover src={book.cover} alt="bookCover" />
      <BookOverviewContainer>
        <BookOverviewTitle>책 소개</BookOverviewTitle>
        <GreyDivider />
        <BookOverview>{book.description}</BookOverview>
      </BookOverviewContainer>
    </Wrapper>
  );
};

export default BookInfo;
