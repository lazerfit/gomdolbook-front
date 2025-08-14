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

const Wrapper = styled(motion.div)`
  ${CssScreen};
  margin-top: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h2`
  ${fonts.fontFamilyEnglish};
`;

const CollectionTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 13rem;
  ${mixins.flexColumn};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border1);
  border-radius: var(--border-radius-small);
  background-color: var(--white);
  margin: 1rem 0;
  padding: 1rem;

  ${mediaMax.mobile} {
    width: 60%;
  }
`;

const BookCoverContainer = styled.div<{ $name: string }>`
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  ${mixins.flexRow};
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
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
    return <div>Loading . . .</div>;
  }

  return (
    <Wrapper variants={BounceInDownStates} initial="initial" animate="animate" exit="exit">
      <TitleContainer>
        <MainTitle>Collection</MainTitle>
        <CreateCollectionForm onCreate={handleCreateCollection} />
      </TitleContainer>

      {collectionList.map(collection => (
        <Content layout key={collection.name}>
          <CollectionTitle>{collection.name}</CollectionTitle>
          <Divider />
          <BookCoverContainer onClick={() => navigate(`/collections/${collection.id}`)} $name={collection.name}>
            {collection.covers.slice(0, 10).map((cover, index) => (
              <BookCover src={cover} key={index} alt="책 표지" />
            ))}
          </BookCoverContainer>
        </Content>
      ))}
    </Wrapper>
  );
};

export default CollectionPage;
