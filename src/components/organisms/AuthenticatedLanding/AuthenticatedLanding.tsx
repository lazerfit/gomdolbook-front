import { styled } from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useStatusBooks } from '@/hooks';
import { Screen } from '@/components/templates/Screen';
import { InputSkeleton } from '@/components/molecules/SkeletonLoader';
import BookSearchInput from '@/components/molecules/BookSearchInput';
import BookCoverList from '@/components/molecules/BookCoverList';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Screen)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const AuthenticatedLanding = () => {
  const { initialized } = useKeycloak();
  const navigate = useNavigate();
  const { data: books = [], isLoading: isStatusBooksLoading } = useStatusBooks('READING');

  const handleCoverClick = (isbn: string, readingLogId?: number) => {
    navigate(`/readingLog/${isbn}/${readingLogId}`);
  };

  if (!initialized || isStatusBooksLoading) {
    return <InputSkeleton />;
  }

  return (
    <Wrapper>
      <BookSearchInput />
      <BookCoverList books={books} onCoverClick={handleCoverClick} isLoading={isStatusBooksLoading} />
    </Wrapper>
  );
};

export default AuthenticatedLanding;
