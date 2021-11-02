import { useRecoilValue } from "recoil";
import {
  Button,
  Icon,
  Table,
  Divider,
  Checkbox,
  Popup,
  Header,
} from "semantic-ui-react";
import { imagesListState } from "../../../recoil/Container";

const ImagePanel = () => {
  const imageList = useRecoilValue(imagesListState);
  console.log(imageList);
  return (
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
              {imageList.map((e) => (
                <Table.Row key={e.Id}>
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>{e.Id}</Table.Cell>
                  <Table.Cell className="warp-text">
                    {e.RepoTags.join(",")}
                  </Table.Cell>
                  <Table.Cell>
                    {(e.Size / 1024 / 1024).toFixed(2)} MB
                  </Table.Cell>
                  <Table.Cell>{e.Created}</Table.Cell>
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
};
export default ImagePanel;
