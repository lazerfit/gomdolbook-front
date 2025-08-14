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
  gap: 0.31rem;
  width: 31rem;
  height: 100%;
`;

const BookTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const SubTitle = styled.div`
  color: var(--grey7);
`;

const BookCover = styled(BookCoverBig)`
  margin-top: 1rem;
`;

const BookOverviewContainer = styled.div`
  width: 400px;
  margin-top: 4rem;
  border: 1px solid var(--border1);
  border-radius: var(--border-radius-small);
  padding: 1rem;
  background-color: var(--white);
`;

const BookOverviewTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BookOverview = styled.div`
  margin-top: 1rem;
`;

const GreyDivider = styled(Divider)`
  height: 1px;
  background-color: var(--border2);
`;

interface BookDetailsProps {
  book: BookResponse;
}

const BookInfo = ({ book }: BookDetailsProps) => {
  const [mainTitle, subTitle] = book.title.split('-');

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
