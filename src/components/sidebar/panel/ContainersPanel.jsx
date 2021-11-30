import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import {
  Table,
  Label,
  Icon,
  Button,
  Checkbox,
  Divider,
  Header,
} from "semantic-ui-react";
import { containerPanelListState } from "../../../recoil/Container";
import { containersSocket } from "../../../recoil/Socketio";
import ConfirmModal from "../../ConfirmModal";

const selectedContainersId = new Set([]);

const ContainersPanel = () => {
  const containers = useRecoilValue(containerPanelListState);
  const containerSocket = useRecoilValue(containersSocket);

  const handlecheck = (e, { checked, id }) => {
    if (checked) selectedContainersId.add(id);
    else selectedContainersId.delete(id);
  };

  const startContainer = () => {
    selectedContainersId.forEach((id) => {
      containerSocket.emit("start", id, {});
      toast.info(`🟢 Starting Container: ${id.substring(0, 12)}`);
    });
  };

  const stopContainer = () => {
    selectedContainersId.forEach((id) => {
      containerSocket.emit("stop", id, {});
      toast.info(`🟥 Stopping Container: ${id.substring(0, 12)}`);
    });
  };

  const deleteContainer = (confirm) => {
    if (!confirm) return;
    selectedContainersId.forEach((id) => {
      containerSocket.emit("remove", id, { force: true });
      toast.info(`🗑️ Removing Container: ${id.substring(0, 12)}`);
    });
    selectedContainersId.clear();
  };

  return (
    <>
      <div className="flex-box">
        <Header dividing size="large">
          Action
        </Header>
        <Button.Group>
          <Button positive onClick={startContainer}>
            <Icon name="play" />
            Start
          </Button>
          <Button color="yellow" onClick={stopContainer}>
            <Icon name="pause" />
            Stop
          </Button>

          <ConfirmModal
            trigger={
              <Button negative>
                <Icon name="trash" />
                Delete
              </Button>
            }
            confirmCallback={(choose) => deleteContainer(choose)}
          />
        </Button.Group>
        <Divider />

        <div className="flex-tab">
          <Table fixed compact="very" basic="very" selectable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell style={{ width: "min-content" }}>
                  <Checkbox disabled />
                </Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {containers.map((container) => (
                <Table.Row key={container.id}>
                  <Table.Cell>
                    <Checkbox id={container.id} onChange={handlecheck} />
                  </Table.Cell>
                  <Table.Cell>
                    {(container.state === "exited" ||
                      container.state === "dead") && (
                      <Label color="red">{container.state}</Label>
                    )}
                    {container.state === "running" && (
                      <Label color="green">{container.state}</Label>
                    )}
                    {(container.state === "created" ||
                      container.state === "restarting" ||
                      container.state === "paused") && (
                      <Label color="yellow">{container.state}</Label>
                    )}
                  </Table.Cell>
                  <Table.Cell className="warp-text">
                    {container.name}
                  </Table.Cell>
                  <Table.Cell>{container.id.substring(0, 12)}</Table.Cell>
                  <Table.Cell>{container.name}</Table.Cell>
                  <Table.Cell>{container.created}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ContainersPanel;
