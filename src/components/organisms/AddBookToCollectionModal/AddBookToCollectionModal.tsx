import { styled } from 'styled-components';
import Modal from '@/components/templates/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import { CollectionsResponse } from '@/api/services/CollectionService';
import Button from '@/components/atoms/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '@/components/atoms/Select';

const SelectContainer = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const AddButton = styled(Button)`
  width: 3.5rem;
`;

const NavigateToCollectionButton = styled(Button)`
  width: 7.5rem;
`;

interface Props {
  close: () => void;
  isOpen: boolean;
  collections: CollectionsResponse[];
  onAdd: (id: number) => void;
}

const AddBookToCollectionModal = ({ close, isOpen, collections, onAdd }: Props) => {
  const inputOptions = collections.map(collection => ({
    name: collection.name,
    id: collection.id,
  }));
  const [collectionId, setCollectionId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (collections.length > 0) {
      setCollectionId(collections[0].id);
    }
  }, [collections]);

  return (
    <Modal
      close={close}
      ReactModalProps={{ isOpen }}
      title="컬렉션에 추가하기"
      content={
        !collections || collections.length === 0 ? (
          <NavigateToCollectionButton onClick={() => navigate('/collections')}>
            컬렉션 만들러가기
          </NavigateToCollectionButton>
        ) : (
          <SelectContainer>
            <Select options={inputOptions} onChange={e => setCollectionId(parseInt(e.target.value, 10))} />
            <AddButton onClick={() => onAdd(collectionId)}>Add</AddButton>
          </SelectContainer>
        )
      }
      size={MODAL_SIZES.small}
    />
  );
};

export default AddBookToCollectionModal;
