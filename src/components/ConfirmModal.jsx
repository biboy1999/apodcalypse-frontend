import { useState } from "react";
import { Modal, Icon, Button } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ trigger, confirmCallback }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmClick = (choose) => {
    confirmCallback(choose);
    setOpen(false);
  };

  return (
    <>
      <Modal
        size="tiny"
        trigger={trigger}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>
          <Icon.Group>
            <Icon name="exclamation triangle" />
          </Icon.Group>
          <span> Confirm</span>
        </Modal.Header>
        <Modal.Content>
          <p>Action can&apos;t be reverted. Are you sure to proceed?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleConfirmClick(false)}>Cancel</Button>
          <Button onClick={() => handleConfirmClick(true)} negative>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default ConfirmModal;
