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
  margin-top: var(--space-3);
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
`;

const BookItem = styled.div`
  width: 100%;
  margin-top: var(--space-3);
  ${mixins.flexColumn};
  align-items: center;
  justify-content: center;
  gap: var(--space-half);
`;

const BookTitle = styled.div`
  display: flex;
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
              <h4 style={{ color: 'var(--accent-color)' }}>{title}</h4>
              <h4>에 대한 검색결과</h4>
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
