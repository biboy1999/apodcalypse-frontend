import { useRecoilValue } from "recoil";
import { Table } from "semantic-ui-react";
import { containerNetworkListState } from "../../../recoil/Container";

const ImagePanel = () => {
  const networksList = useRecoilValue(containerNetworkListState);
  const sorted = [...networksList].sort((a, b) => a.Id > b.Id);
  // console.log(imageList);
  return (
    <>
      <div className="flex-box">
        {/* <Header dividing size="large">
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
        <Divider /> */}
        <div className="flex-tab">
          <Table fixed compact="very" basic="very" selectable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Driver</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sorted.map((e) => (
                <Table.Row key={e.Id}>
                  <Table.Cell>{e.Id}</Table.Cell>
                  <Table.Cell className="warp-text">{e.Name}</Table.Cell>
                  <Table.Cell>{e.Driver}</Table.Cell>
                  <Table.Cell>{e.Created}</Table.Cell>
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
