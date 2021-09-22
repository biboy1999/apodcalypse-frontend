import { useState } from "react";
import {
  Modal,
  Menu,
  Segment,
  Icon,
  Tab,
  Header,
  Button,
  Form
} from "semantic-ui-react";

const panes = [
  {
    menuItem: (
      <Menu.Item name="registry">
        <Icon name="download" />
        Pull from registry
      </Menu.Item>
    ),
    render: () =>
      <Tab.Pane>
        <Form>
          <Form.Group inline>
            <Form.Input label='Registry' placeholder="docker.io" width='16' />
          </Form.Group>
          <Form.Group inline>
            <Form.Input label='Image' placeholder="hello-world:latest" width='16' />
          </Form.Group>
          <Button type="submit" positive>Pull</Button>
        </Form>
      </Tab.Pane>
  },
  {
    menuItem: (
      <Menu.Item name="package">
        <Icon name="upload" />
        Upload tar/zip
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Segment placeholder>
          <Header icon>
            <Icon name="file archive" />
            Drag file here or click to browse
          </Header>
          <Button primary>Browse</Button>
        </Segment>
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item name="editor">
        <Icon name="code" />
        Editor
      </Menu.Item>
    ),
    render: () => <Tab.Pane>Monaco editor here</Tab.Pane>,
  },
];

// eslint-disable-next-line react/prop-types
const AddImage = ({ trigger }) => (
  <>
    <Modal size="large" trigger={trigger}>
      <Modal.Header>
        <Icon.Group>
          <Icon name="window restore" />
          <Icon name="add" corner />
        </Icon.Group>
        <span> Add Images</span>
      </Modal.Header>
      <Modal.Content scrolling>
        <Tab
          menu={{ pointing: true, widths: "3", icon: "labeled" }}
          panes={panes}
        />
      </Modal.Content>
    </Modal>
  </>
);
export default AddImage;
