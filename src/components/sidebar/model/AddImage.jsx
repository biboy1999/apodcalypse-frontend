import { useState } from "react";
import {
  Modal,
  Menu,
  Segment,
  Icon,
  Tab,
  Header,
  Button,
} from "semantic-ui-react";

const panes = [
  {
    menuItem: (
      <Menu.Item name="registry">
        <Icon name="download" />
        Pull from registry
      </Menu.Item>
    ),
    render: () => <Tab.Pane>pull</Tab.Pane>,
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
    render: () => <Tab.Pane>editor</Tab.Pane>,
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
        {/* <Menu widths="3" icon="labeled" pointing>
            <Menu.Item name="editor">
              <Icon name="download" />
              Pull from registry
            </Menu.Item>
            <Menu.Item name="dockerfile" active>
              <Icon name="upload" />
              Upload tar/zip
            </Menu.Item>
            <Menu.Item name="editor">
              <Icon name="code" />
              Editor
            </Menu.Item>
          </Menu>
          <Segment>
            <img
              alt=""
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />
            <img
              alt=""
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />
            <img
              alt=""
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />
          </Segment> */}
      </Modal.Content>
    </Modal>
  </>
);
export default AddImage;
