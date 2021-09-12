import {
  Button,
  Icon,
  Table,
  Divider,
  Checkbox,
  Popup,
  Header,
} from "semantic-ui-react";
import { testImagesList } from "../../../temp/initial-elements";

const ImagePanel = () => (
  <>
    <div className="flex-box">
      <Header dividing size="large">
        Action
      </Header>
      <Button.Group widths="2">
        <Popup
          content="Remove unused images"
          position="bottom center"
          trigger={
            <Button>
              <Icon.Group>
                <Icon name="database" />
                <Icon name="times" corner />
              </Icon.Group>
              Purge
            </Button>
          }
        />
        <Button negative>
          <Icon name="trash" />
          Remove Selected
        </Button>
      </Button.Group>
      <Divider />
      <div className="flex-tab">
        <Table fixed compact="very" basic="very" selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell style={{ width: "min-content" }}>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Tags</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell width="1" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {testImagesList.map((e) => (
              <Table.Row key={e.id}>
                <Table.Cell>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{e.id}</Table.Cell>
                <Table.Cell className="warp-text">
                  {`${e.repo}:${e.tag}`}
                </Table.Cell>
                <Table.Cell>{e.size}</Table.Cell>
                <Table.Cell>{e.created}</Table.Cell>
                <Table.Cell>
                  <Icon name="arrow right" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  </>
);
export default ImagePanel;
