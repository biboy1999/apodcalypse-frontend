import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import {
  Button,
  Checkbox,
  Divider,
  Header,
  Icon,
  Table,
} from "semantic-ui-react";
import { containerNetworkListState } from "../../../recoil/Container";
import { networksSocket } from "../../../recoil/Socketio";

const selectedNetowrksId = new Set([]);

const ImagePanel = () => {
  const networksList = useRecoilValue(containerNetworkListState);
  const networkSocket = useRecoilValue(networksSocket);

  const sorted = [...networksList].sort((a, b) => a.Id > b.Id);

  const handlecheck = (e, { checked, id }) => {
    if (checked) selectedNetowrksId.add(id);
    else selectedNetowrksId.delete(id);
  };

  const deleteNetowrk = () => {
    selectedNetowrksId.forEach((id) => {
      networkSocket.emit("remove", id);
      toast.info(`Removing Network: ${id.substring(0, 12)}`);
    });
    selectedNetowrksId.clear();
  };
  return (
    <>
      <div className="flex-box">
        <Header dividing size="large">
          Action
        </Header>
        <Button.Group widths="2">
          {/* <Popup
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
          /> */}
          <Button negative onClick={deleteNetowrk}>
            <Icon name="trash" />
            Remove
          </Button>
        </Button.Group>
        <Divider />
        <div className="flex-tab">
          <Table fixed compact="very" basic="very" selectable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell style={{ width: "min-content" }}>
                  <Checkbox disabled />
                </Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Driver</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sorted.map((e) => (
                <Table.Row key={e.Id}>
                  <Table.Cell>
                    <Checkbox id={e.Id} onChange={handlecheck} />
                  </Table.Cell>
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
