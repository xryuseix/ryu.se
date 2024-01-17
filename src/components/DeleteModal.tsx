import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type PropsT = {
  isOpen: boolean;
  onClose: () => void;
  from: string;
  to: string;
  handleDelete: () => void;
};

export const DeleteModal = (props: PropsT) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Do you really want to remove the following link?
          <br /> {`https://l.ryuse.dev/${props.from} → ${props.to}`}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            variant="outline"
            mr={3}
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button variant="ghost" onClick={props.handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
