import { beforeEach, describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import AddBookToCollectionModal from '@/components/organisms/AddBookToCollectionModal/AddBookToCollectionModal';
import { CollectionsResponse } from '@/api/services/CollectionService';
import { mockNavigate } from '@/setupTests';

const mockOnClose = vi.fn();
const mockOnAdd = vi.fn();
const mockCollections = [
  {
    id: 1,
    name: 'testCollection1',
    covers: ['cover'],
  },
];
const mockCollectionsEmpty: CollectionsResponse[] = [];

describe('AddBookToCollectionModal', () => {
  describe('collection이 존재', () => {
    beforeEach(() => {
      render(
        <AddBookToCollectionModal close={mockOnClose} isOpen={true} collections={mockCollections} onAdd={mockOnAdd} />,
      );
    });

    it('collection이 존재하면 Add 버튼이 존재해야한다.', () => {
      const btn = screen.getByText('Add');
      const collectionBtn = screen.queryByText('컬렉션 만들러가기');

      expect(btn).toBeInTheDocument();
      expect(collectionBtn).toBeNull();
    });

    it('add 버튼을 클릭하면 onAdd 함수가 호출되어야 한다.', async () => {
      const btn = screen.getByText('Add');
      await userEvent.click(btn);

      expect(mockOnAdd).toBeCalledTimes(1);
    });
  });

  describe('collection이 존재하지 않음', () => {
    beforeEach(() => {
      render(
        <AddBookToCollectionModal
          close={mockOnClose}
          isOpen={true}
          collections={mockCollectionsEmpty}
          onAdd={mockOnAdd}
        />,
      );
    });

    it('컬렉션 만들러가기 버튼이 렌더링되어야 한다.', () => {
      const btn = screen.getByText('컬렉션 만들러가기');
      const addBtn = screen.queryByText('Add');

      expect(btn).toBeInTheDocument();
      expect(addBtn).toBeNull();
    });

    it('컬렉션 만들러가기 버튼을 클릭하면 collections로 이동해야 한다.', async () => {
      const btn = screen.getByText('컬렉션 만들러가기');
      await userEvent.click(btn);

      expect(mockNavigate).toBeCalledTimes(1);
      expect(mockNavigate).toBeCalledWith('/collections');
    });
  });
});
