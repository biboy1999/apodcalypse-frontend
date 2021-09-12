import { Header, Label, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import TopLabelProgress from "../TopLabelProgress";
import LabelNodeHandle from "./LabelNodeHandle";

const ContainerNode = ({ data }) => (
  <>
    <Header as="h5" style={{ wordBreak: "break-all" }}>
      {data.name}
      {data.healthyStatus != null && (
        <Label
          color={
            data.healthyStatus === "healthy"
              ? "green"
              : data.healthyStatus === "starting"
              ? "yellow"
              : "red"
          }
          size="mini"
          horizontal
        >
          {data.healthyStatus}
        </Label>
      )}
      <Header.Subheader>{`#${data.id.substring(0, 12)}`}</Header.Subheader>
    </Header>

    <TopLabelProgress
      title="CPU"
      label={data.cpu != null ? `${Math.ceil(data.cpu)}%` : "n/a"}
      value={data.cpu}
      total={100}
    />

    <TopLabelProgress
      title="Memory"
      label={
        data.memory !== null
          ? `${Math.round(data.memory)}/${Math.round(data.totalMemory)} MiB`
          : "n/a"
      }
      value={data.memory}
      total={data.totalMemory}
    />

    <Grid>
      <Grid.Column floated="left" width={8}>
        Processes:
      </Grid.Column>
      <Grid.Column floated="right" width={8} textAlign="right">
        {data.processCount != null || "n/a"}
      </Grid.Column>
    </Grid>

    <div>IP Table</div>
    <Grid
      columns="equal"
      className=""
      celled="internally"
      verticalAlign="middle"
      textAlign="center"
    >
      <Grid.Row stretched>
        <Grid.Column>
          <Grid divided="vertically" textAlign="center">
            {data.ports.map((port) => (
              <Grid.Row
                key={`${data.id}-${port.IP}-${port.PrivatePort}:${port.PublicPort}/${port.Type}`}
              >
                {port.PrivatePort}:{port.PublicPort}/{port.Type.toUpperCase()}
              </Grid.Row>
            ))}
          </Grid>
        </Grid.Column>

        <Grid.Column>
          <Grid divided="vertically" textAlign="center">
            {Object.entries(data.networks).map(([, value]) => (
              <Grid.Row key={`${data.id}-${value.NetworkID}`}>
                {value.IPAddress}
                <LabelNodeHandle
                  type="source"
                  position="right"
                  id={`${data.id}-${value.NetworkID}`}
                />
              </Grid.Row>
            ))}
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Label attached="top right" size="tiny" color="green">
      {data.status}
    </Label>
  </>
);

ContainerNode.propTypes = {
  data: PropTypes.shape({
    healthyStatus: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    cpu: PropTypes.number,
    memory: PropTypes.number,
    totalMemory: PropTypes.number,
    processCount: PropTypes.number,
    status: PropTypes.string,
    networks: PropTypes.object,
    ports: PropTypes.arrayOf(
      PropTypes.shape({
        Type: PropTypes.string,
        PrivatePort: PropTypes.number,
        PublicPort: PropTypes.number,
      }),
    ),
  }).isRequired,
};

export default ContainerNode;
