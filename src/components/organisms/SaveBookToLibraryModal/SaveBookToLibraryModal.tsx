import Modal from '@/components/templates/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import { BookStatus } from '@/api/services/types';
import StatusButton from '@/components/molecules/StatusButton';

interface Props {
  close: () => void;
  isOpen: boolean;
  onSave: (status: BookStatus) => void;
  status: BookStatus;
}

const SaveBookToLibraryModal = ({ close, isOpen, onSave, status }: Props) => {
  return (
    <Modal
      close={close}
      size={MODAL_SIZES.small}
      ReactModalProps={{ isOpen }}
      title="내 서재 저장"
      content={<StatusButton onSave={onSave} status={status} />}
    />
  );
};

export default SaveBookToLibraryModal;
