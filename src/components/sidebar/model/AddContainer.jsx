import { useState } from "react";
import {
  Modal,
  Icon,
  Form,
  Divider,
  Header,
  Accordion,
} from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const AddContainer = ({ trigger }) => (
  <>
    <Modal size="fullscreen" trigger={trigger}>
      <Modal.Header>
        <Icon.Group>
          <Icon name="dice d6" />
          <Icon name="add" corner />
        </Icon.Group>
        <span> Add Container</span>
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Accordion panels="asd"/>
          {/* <Form.Group inline>
            <Form.Input label="Name" placeholder="pickle_rick" width='16' />
          </Form.Group>
          <Header dividing>Image</Header>
          <Form.Group inline>
            <Form.Input label='Registry' placeholder="docker.io" width='16' />
          </Form.Group>
          <Form.Group inline>
            <Form.Input label='Image' placeholder="hello-world:latest" width='16' />
          </Form.Group>
          <Header dividing>
            Container
            <Header.Subheader>Environment variable, Capabilities, Network</Header.Subheader>
          </Header> */}
        </Form>
      </Modal.Content>
    </Modal>
  </>
);
export default AddContainer;
