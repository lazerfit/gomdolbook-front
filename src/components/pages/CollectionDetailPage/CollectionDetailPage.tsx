import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { motion } from 'framer-motion';
import { BounceInDownStates } from '@/utils/variables';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useCollection,
  useDeleteCollection,
  useInvalidateCollections,
  useRemoveBookFromCollection,
  useRenameCollection,
} from '@/hooks';
import Banner from '@/components/atoms/Banner';
import { CssScreen } from '@/components/templates/Screen';
import { lazy, useMemo, useState, Suspense } from 'react';
import { MotionCircleButton } from '@/components/atoms/ButtonCircle';
import { RxGear } from 'react-icons/rx';
import { RiCloseFill, RiDeleteBinFill } from 'react-icons/ri';
import { CgEditFlipH } from 'react-icons/cg';
import HorizonalFloatingButton from '@/components/molecules/HorizonalFloatingButton';
import { useQueryClient } from '@tanstack/react-query';
import BookCoverList from '@/components/molecules/BookCoverList';

const InputModal = lazy(() => import('@/components/molecules/InputModal'));
const CollectionDetailModal = lazy(() => import('@/components/organisms/CollectionDetailModal/CollectionDetailModal'));

const Wrapper = styled(motion.div)`
  ${CssScreen};
  margin-top: var(--space-4);
  position: relative;
`;

const BannerContainer = styled.div`
  ${mixins.flexCenter};
  margin-top: var(--space-6);
`;

const CollectionTitle = styled.div`
  ${mixins.flexCenter}
  font-size: 2rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-1);
`;

const buttonVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

const StyledButton = styled(MotionCircleButton)`
  padding: var(--space-2);
  border: 1px solid var(--border-color-1);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--background-grey);
  }
`;

const CollectionDetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const [isbn, setIsbn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const numberId = useMemo(() => parseInt(id, 10), [id]);

  const { data: collection, isLoading } = useCollection(numberId);
  const { mutate: removeBook } = useRemoveBookFromCollection();
  const { mutate: deleteCollection } = useDeleteCollection();
  const { mutate: renameCollection } = useRenameCollection();
  const { invalidate: invalidateCollections } = useInvalidateCollections();

  const handleBookOnClick = (isbn: string) => {
    setIsbn(isbn);
    setIsModalOpen(true);
  };

  const handleRemoveBookFromCollection = () => {
    removeBook(
      { isbn, id: numberId },
      {
        onSuccess: () => {
          if (window.confirm(`정말 삭제하시겠습니까?`)) {
            invalidateCollections(numberId);
            setIsModalOpen(false);
          }
        },
        onError: e => {
          console.log(e);
        },
      },
    );
  };

  const handleDeleteCollection = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteCollection(
        { id: numberId },
        {
          onSuccess: () => {
            navigate('/collections');
            queryClient.removeQueries({ queryKey: ['collection', numberId] });
            queryClient.invalidateQueries({ queryKey: ['collectionList'] }).catch(e => console.log(e));
          },
          onError: e => {
            console.log(e);
          },
        },
      );
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleRenameCollection = () => {
    renameCollection(
      {
        id: numberId,
        name: newCollectionName,
      },
      {
        onSuccess: () => {
          invalidateCollections(numberId);
          handleCloseEditModal();
        },
        onError: e => {
          console.log(e);
        },
      },
    );
  };

  return (
    <Wrapper variants={BounceInDownStates} initial="initial" animate="animate">
      <CollectionTitle>{collection?.collectionName}</CollectionTitle>
      {collection?.books.length === 0 ? (
        <BannerContainer>
          <Banner>컬렉션에 책을 추가해주세요.</Banner>
        </BannerContainer>
      ) : (
        <BookCoverList books={collection?.books ?? []} onCoverClick={handleBookOnClick} isLoading={isLoading} />
      )}
      <HorizonalFloatingButton top="1rem" left="4rem" isChange={isSettingMode}>
        {isSettingMode ? (
          <ButtonContainer>
            <StyledButton key="close" onClick={() => setIsSettingMode(false)}>
              <RiCloseFill />
            </StyledButton>
            <StyledButton key="delete" onClick={handleDeleteCollection} data-testid="collection-delete-button">
              <RiDeleteBinFill />
            </StyledButton>
            <StyledButton key="edit" onClick={() => setIsEditModalOpen(true)} data-testid="collection-edit-button">
              <CgEditFlipH />
            </StyledButton>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <StyledButton
              key="gear"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              data-testid="collection-setting-button"
              onClick={() => setIsSettingMode(true)}>
              <RxGear />
            </StyledButton>
          </ButtonContainer>
        )}
      </HorizonalFloatingButton>
      <Suspense fallback={null}>
        <CollectionDetailModal
          close={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onRemove={handleRemoveBookFromCollection}
          isbn={isbn}
        />
      </Suspense>
      <Suspense fallback={null}>
        <InputModal
          value={newCollectionName}
          onChange={e => setNewCollectionName(e.target.value)}
          onSuccess={handleRenameCollection}
          close={handleCloseEditModal}
          isOpen={isEditModalOpen}
        />
      </Suspense>
    </Wrapper>
  );
};

export default CollectionDetailPage;
