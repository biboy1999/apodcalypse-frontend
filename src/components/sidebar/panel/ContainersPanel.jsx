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

const ContainersPanel = () => {
  const containers = useRecoilValue(containerPanelListState);
  return (
    <>
      <div className="flex-box">
        <Header dividing size="large">
          Action
        </Header>
        <Button.Group>
          <Button positive>
            <Icon name="play" />
            Start
          </Button>
          <Button color="yellow">
            <Icon name="pause" />
            Pause
          </Button>
          <Button negative>
            <Icon name="trash" />
            Delete
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
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell width="1" />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {containers.map((container) => (
                <>
                  <Table.Row key={container.id}>
                    <Table.Cell>
                      <Checkbox />
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
                    <Table.Cell>
                      <Icon name="arrow right" />
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
              {/* <Table.Row>
                <Table.Cell>
                  <Label color="red">Stopped</Label>
                </Table.Cell>
                <Table.Cell className="warp-text">frontend suck</Table.Cell>
                <Table.Cell>fffffff001</Table.Cell>
                <Table.Cell>not_vue</Table.Cell>
                <Table.Cell>
                  <Icon name="arrow right" />
                </Table.Cell>
              </Table.Row> */}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ContainersPanel;
