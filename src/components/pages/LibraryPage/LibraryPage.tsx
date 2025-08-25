import { styled } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { CssScreen } from '@/components/templates/Screen';
import StatusNavigation from '@/components/molecules/StatusNavigation';
import { motion } from 'framer-motion';
import { useStatusBooks } from '@/hooks';
import BookCoverList from '@/components/molecules/BookCoverList';
import { BookCoverListSkeleton } from '@/components/molecules/SkeletonLoader';

const Wrapper = styled(motion.div)`
  ${CssScreen}
`;

type LibraryStatus = 'READING' | 'TO_READ' | 'FINISHED';

const statusOptions: { label: string; status: LibraryStatus; path: string }[] = [
  { label: '읽는 중', status: 'READING', path: '/library/READING' },
  { label: '읽을 예정', status: 'TO_READ', path: '/library/TO_READ' },
  { label: '읽기 완료', status: 'FINISHED', path: '/library/FINISHED' },
];

const LibraryPage = () => {
  const navigate = useNavigate();
  const { status = 'READING' } = useParams();
  const { data: books = [], isLoading: isBookLoading } = useStatusBooks(status);

  const handleCoverClick = (isbn: string, readingLogId?: number) => {
    navigate(`/readingLog/${isbn}/${readingLogId}`);
  };

  return (
    <Wrapper>
      <StatusNavigation statusOption={statusOptions} status={status} />
      <BookCoverList books={books} onCoverClick={handleCoverClick} isLoading={isBookLoading} />
    </Wrapper>
  );
};

export default LibraryPage;
