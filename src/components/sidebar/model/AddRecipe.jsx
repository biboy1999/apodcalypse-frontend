import { useState } from "react";
import {
  Modal,
  Menu,
  Segment,
  Icon,
  Tab,
  Header,
  Button,
  Form,
  Grid,
  Divider,
} from "semantic-ui-react";

const panes = [
  {
    menuItem: (
      <Menu.Item name="registry">
        <Icon name="download" />
        Pull from registry
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Form>
          <Form.Group>
            <Form.Input label="Registry" placeholder="docker.io" width="16" />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Image"
              placeholder="hello-world:latest"
              width="16"
            />
          </Form.Group>
          <Button type="submit" positive>
            Pull
          </Button>
        </Form>
      </Tab.Pane>
    ),
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

const handleUpload = (e) => {
  // const reader = new FileReader();
  console.log(e.target.files);
};

// eslint-disable-next-line react/prop-types
const AddRecipe = ({ trigger }) => (
  <>
    <Modal size="fullscreen" trigger={trigger}>
      <Modal.Header>
        <Icon.Group>
          <Icon name="window restore" />
          <Icon name="add" corner />
        </Icon.Group>
        <span>Recipe Wizard</span>
      </Modal.Header>
      <Modal.Content scrolling>
        <Segment placeholder>
          <Grid columns="2" stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header>
                  <div>
                    <Icon.Group size="huge">
                      <Icon name="scroll" />
                      <Icon corner name="pen nib" />
                    </Icon.Group>
                  </div>
                  Create from scratch
                </Header>
                <Button as="label" primary>
                  Create
                </Button>
              </Grid.Column>

              <Grid.Column>
                <Header>
                  <div>
                    <Icon.Group size="huge">
                      <Icon name="upload" />
                      <Icon corner="bottom right" name="scroll" />
                    </Icon.Group>
                  </div>
                  Load predefined Recipe
                </Header>
                <Button as="label" htmlFor="recipe-zip-filename" primary>
                  Upload
                </Button>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="recipe-zip-filename"
                  onChange={handleUpload}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {/* <Tab
          menu={{ pointing: true, widths: "3", icon: "labeled" }}
          panes={panes}
        /> */}
      </Modal.Content>
    </Modal>
  </>
);
export default AddRecipe;
