import React from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent className="pt-4">
        <ModalBody className="text-center">
          <p>Are you sure you want to delete this page?</p>
        </ModalBody>
        <ModalFooter className="flex jusitfy-between w-full">
          <Button onPress={onClose} className="w-full font-bold" variant="solid" color="primary">
            Cancel
          </Button>
          <Button className="w-full font-bold" variant="bordered" color="primary" onPress={onConfirm}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
