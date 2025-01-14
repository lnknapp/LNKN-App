import { Modal, ModalContent, ModalBody } from '@nextui-org/react';
import { PageType } from '../../../data/entities/pages';
import { OptionSelection } from './OptionSelection';
import { PageOption } from './PageOption';
import { usePage } from '../hooks/usePage';

interface NewPageModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedPageType: PageType | null;
}

export function NewPageModal({ isOpen, onOpenChange, selectedPageType }: NewPageModalProps) {
  const { handleNext, handleCreatePage } = usePage();

  const renderContent = () => {
    return (
      <OptionSelection
        selectedPageType={selectedPageType}
        onSelectOption={(option) => {
          if (option === PageOption.Custom)
            handleCreatePage(selectedPageType);
          else handleNext();
        }}
      />
    );
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="py-8">
          {renderContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default NewPageModal;
