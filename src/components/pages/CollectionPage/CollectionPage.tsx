import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { mediaMax } from '@/utils';
import { useCollections, useCreateCollection } from '@/hooks';
import { CssScreen } from '@/components/templates/Screen';
import { BookCoverMid } from '@/components/atoms/BookCover';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { BounceInDownStates } from '@/utils/variables';
import { motion } from 'framer-motion';
import * as fonts from '@/styles/fonts';
import React from 'react';
import CreateCollectionForm from '@/components/molecules/CreateCollectionForm';
import Divider from '@/components/atoms/Divider';
import { useQueryClient } from '@tanstack/react-query';
import Loader from '@/components/atoms/Loader';

const Wrapper = styled(motion.div)`
  ${CssScreen};
  margin-top: var(--space-4);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--space-2);
  width: 100%;
`;

const MainTitle = styled.h2`
  ${fonts.fontFamilyEnglish};
`;

const CollectionTitle = styled.div`
  width: 100%;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 13rem;
  ${mixins.flexColumn};
  justify-content: center;
  align-items: center;
  gap: var(--space-1);
  border: 1px solid var(--border-color-1);
  border-radius: var(--radius-md);
  background-color: var(--white);
  margin: var(--space-2);
  padding: var(--space-2);

  ${mediaMax.mobile} {
    width: 60%;
  }
`;

const BookCoverContainer = styled.div<{ $name: string }>`
  width: 100%;
  height: 100%;
  padding: var(--space-half);
  ${mixins.flexRow};
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: var(--space-2);
  cursor: pointer;
  filter: grayscale(1);
  transition: filter 0.3s;
  position: relative;

  &:hover {
    filter: grayscale(0);
  }
`;

const BookCover = styled(BookCoverMid)``;

const CollectionPage = () => {
  const { mutate: createCollection } = useCreateCollection();
  const { data: collectionList = [], isLoading: isCollectionListLoading } = useCollections();
  const { initialized, keycloak } = useKeycloak();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreateCollection = (
    name: string,
    onSuccessCallback: () => void,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (name.trim() !== '' && event.key === 'Enter') {
      createCollection(name.trim(), {
        onSuccess: () => {
          onSuccessCallback();
          queryClient
            .invalidateQueries({ queryKey: ['collectionList'] })
            .catch(e => console.log('컬렉션 목록 새로고침 실패:', e));
        },
        onError: e => {
          console.log('createCollection error', e);
        },
      });
    }
  };

  if (isCollectionListLoading || !initialized || !keycloak.authenticated) {
    return <Loader />;
  }

  return (
    <Wrapper variants={BounceInDownStates} initial="initial" animate="animate" exit="exit">
      <TitleContainer>
        <MainTitle>Collection</MainTitle>
        <CreateCollectionForm onCreate={handleCreateCollection} />
      </TitleContainer>

      {collectionList.map(collection => (
        <Content layout key={collection.name}>
          <CollectionTitle>
            <h3>{collection.name}</h3>
          </CollectionTitle>
          <Divider />
          <BookCoverContainer onClick={() => navigate(`/collections/${collection.id}`)} $name={collection.name}>
            {collection.covers.slice(0, 10).map((cover, index) => (
              <BookCover src={cover} key={index} alt={`책표지-${index}`} />
            ))}
          </BookCoverContainer>
        </Content>
      ))}
    </Wrapper>
  );
};

export default CollectionPage;
