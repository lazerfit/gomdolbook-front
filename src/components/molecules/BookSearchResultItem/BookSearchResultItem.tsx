import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { BookCoverMidBig } from '@/components/atoms/BookCover';
import type { BookSearchResponse } from '@/api/services/types';
import { mediaMax } from '@/utils';
import { BookInformationBox } from '@/components/molecules/BookSearchResultItem';

const Wrapper = styled.div`
  width: 100%;
  ${mixins.flexColumn}
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  ${mixins.flexCenter};
  width: 53.125rem;
  height: 12.5rem;
  min-height: 12.5rem;
  cursor: pointer;
  padding: 0.82rem 1.32rem 1.44rem 1.32rem;
  background-color: var(--white);
  border-radius: var(--border-radius-small);
  border: 1px solid var(--border1);
`;

const BookDetailsBox = styled.div`
  width: 42.5rem;
  margin: 0 1.32rem;
  ${mixins.flexColumn};
  justify-content: center;
  gap: 0.5rem;

  ${mediaMax.mobile} {
    width: 60%;
  }
`;

const BookTitle = styled.h3`
  ${mixins.LineClamp}
  font-weight: 600;

  ${mediaMax.mobile} {
    -webkit-line-clamp: 3;
  }
`;

const BookOverview = styled.div`
  ${mixins.LineClamp}
  color: var(--grey);

  ${mediaMax.mobile} {
    display: none;
  }
`;

interface BookSearchResultItemProps {
  book: BookSearchResponse;
  onClick: () => void;
}

const BookSearchResultItem = ({ book, onClick = () => void 0 }: BookSearchResultItemProps) => {
  return (
    <Wrapper>
      <Content onClick={onClick}>
        <BookCoverMidBig src={book.cover} alt="cover" />
        <BookDetailsBox>
          <BookTitle>{book.title}</BookTitle>
          <BookInformationBox author={book.author} publisher={book.publisher} publicationDate={book.pubDate} />
          <BookOverview>{book.description}</BookOverview>
        </BookDetailsBox>
      </Content>
    </Wrapper>
  );
};

export default BookSearchResultItem;
