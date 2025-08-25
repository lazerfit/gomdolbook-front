import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { Screen } from '@/components/templates/Screen';
import { useParams, useNavigate } from 'react-router-dom';
import BookSearchInput from '@/components/molecules/BookSearchInput';
import { useBooks } from '@/hooks';
import { BookSearchResultItem } from '@/components/molecules/BookSearchResultItem';
import { BookOverviewSkeletonLoader } from '@/components/molecules/SkeletonLoader';

const Wrapper = styled(Screen)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  margin-top: 1.25rem;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
`;

const BookItem = styled.div`
  width: 100%;
  margin-top: 1.875rem;
  ${mixins.flexColumn};
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const BookTitle = styled.div`
  display: flex;
  font-size: 1.1rem;
`;

const BookSearchResultPage = () => {
  const { title = '' } = useParams();
  const { data: books = [], isLoading: isBooksLoading } = useBooks(title);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <BookSearchInput />
      <Content>
        {isBooksLoading ? (
          <BookItem>
            <BookOverviewSkeletonLoader />
          </BookItem>
        ) : (
          <>
            <BookTitle>
              <p style={{ color: 'var(--pink)' }}>{title}</p>에 대한 검색결과
            </BookTitle>
            <BookItem>
              {books.map(book => (
                <BookSearchResultItem
                  key={book.isbn13}
                  book={book}
                  onClick={() => navigate(`/detail/${book.isbn13}`)}
                />
              ))}
            </BookItem>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default BookSearchResultPage;
