import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Modal, Icon, Button, Header, Grid, Segment } from "semantic-ui-react";

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
          Action can&apos;t be reverted. Are you sure to proceed?
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleConfirmClick(false)} negative>
            No
          </Button>
          <Button onClick={() => handleConfirmClick(true)} positive>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default ConfirmModal;
