import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { Screen } from '@/components/templates/Screen';
import { useParams } from 'react-router-dom';
import {
  useBook,
  useCollections,
  useAddBookToCollection,
  useStatus,
  useSaveOrUpdateStatusBook,
  useInvalidateCollections,
} from '@/hooks';
import BookInfo from '@/components/molecules/BookInfo';
import VerticalFloatingButton from '@/components/molecules/VerticalFloatingButton';
import { StyledCircleButton } from '@/components/atoms/ButtonCircle';
import { FaBookmark } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { useState, lazy, Suspense } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { toast } from 'react-toastify';
import { BookStatus } from '@/api/services/types';
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri';
import { BookDetailSkeletonLoader } from '@/components/molecules/SkeletonLoader';

const SaveBookToLibraryModal = lazy(() => import('@/components/organisms/SaveBookToLibraryModal'));
const AddBookToCollectionModal = lazy(() => import('@/components/organisms/AddBookToCollectionModal'));

const Wrapper = styled(Screen)`
  ${mixins.flexColumn};
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.9rem;
  position: relative;
`;

const Content = styled.div`
  width: 400px;
  margin-top: 4rem;
`;

const Button = styled(StyledCircleButton)`
  font-size: 1.25rem;
  color: var(--grey7);

  &:hover {
    color: var(--pink);
  }
`;

const BookDetailPage = () => {
  const { isbn = '' } = useParams();
  const [saveBookToLibraryModalOpen, setSaveBookToLibraryModalOpen] = useState(false);
  const [addBookToCollectionModalOpen, setAddBookToCollectionModalOpen] = useState(false);
  const { keycloak, initialized } = useKeycloak();

  const { data: book, isLoading: isBookLoading } = useBook(isbn);
  const { data: currentStatus } = useStatus(isbn);
  const { data: collectionList = [] } = useCollections();
  const { mutate: addBookToCollection } = useAddBookToCollection();
  const { handleSaveBookToLibrary } = useSaveOrUpdateStatusBook(isbn, book!, currentStatus ?? BookStatus.NEW);
  const { invalidate } = useInvalidateCollections();

  const handleAddToCollection = (id: number) => {
    addBookToCollection(
      { dto: book!, id },
      {
        onSuccess: () => {
          invalidate(id);
          toast.success('성공적으로 컬렉션에 추가되었습니다.');
          close();
        },
        onError: error => {
          toast.error(error.cause?.message ?? '컬렉션에 추가하는데 실패했습니다.');
        },
      },
    );
  };

  if (!initialized || !keycloak.authenticated || isBookLoading) {
    return <BookDetailSkeletonLoader />;
  }

  if (!book) {
    return <div>No Content . . .</div>;
  }

  return (
    <Wrapper>
      <BookInfo book={book} />
      <Content>
        <VerticalFloatingButton>
          <Button
            data-tooltip-id="collection-tooltip"
            data-tooltip-content="컬렉션에 추가하기"
            data-testid="add-to-collection"
            onClick={() => setAddBookToCollectionModalOpen(true)}>
            <FaBookmark />
          </Button>
          <Button
            data-tooltip-id="status-tooltip"
            data-tooltip-content="내 서재에 저장하기"
            data-tooltip-place="bottom"
            data-testid="add-to-library"
            onClick={() => setSaveBookToLibraryModalOpen(true)}>
            {currentStatus !== BookStatus.NEW && currentStatus !== BookStatus.EMPTY ? (
              <RiHeart2Fill />
            ) : (
              <RiHeart2Line />
            )}
          </Button>
          <Tooltip id="status-tooltip" />
          <Tooltip id="collection-tooltip" />
        </VerticalFloatingButton>
      </Content>
      <Suspense fallback={null}>
        <AddBookToCollectionModal
          close={() => setAddBookToCollectionModalOpen(false)}
          isOpen={addBookToCollectionModalOpen}
          collections={collectionList}
          onAdd={handleAddToCollection}
        />
      </Suspense>
      <Suspense fallback={null}>
        <SaveBookToLibraryModal
          onSave={handleSaveBookToLibrary}
          status={currentStatus ?? BookStatus.NEW}
          isOpen={saveBookToLibraryModalOpen}
          close={() => setSaveBookToLibraryModalOpen(false)}
        />
      </Suspense>
    </Wrapper>
  );
};

export default BookDetailPage;
