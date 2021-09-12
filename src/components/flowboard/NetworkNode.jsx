import { Header, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import LabelNodeHandle from "./LabelNodeHandle";

const NetworkNode = ({ data }) => (
  <>
    <Header as="h5" style={{ wordBreak: "break-all" }}>
      {data.name}
      <Header.Subheader>{`#${data.id.substring(0, 12)}`}</Header.Subheader>
    </Header>

    <Grid className="very compact">
      <Grid.Column floated="left" width={8}>
        Driver:
      </Grid.Column>
      <Grid.Column floated="right" width={8} textAlign="right">
        {data.driver}
      </Grid.Column>

      {data.gateway != null && (
        <>
          <Grid.Column floated="left" width={8}>
            Gateway:
          </Grid.Column>
          <Grid.Column floated="right" width={8} textAlign="right">
            {data.gateway}
          </Grid.Column>
        </>
      )}
      {data.subnet != null && (
        <>
          <Grid.Column floated="left" width={8}>
            Subnet:
          </Grid.Column>
          <Grid.Column floated="right" width={8} textAlign="right">
            {data.subnet}
          </Grid.Column>
        </>
      )}
    </Grid>

    <LabelNodeHandle type="target" position="left" id={data.id} />
  </>
);

NetworkNode.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    driver: PropTypes.string,
    gateway: PropTypes.string,
    subnet: PropTypes.string,
  }).isRequired,
};

export default NetworkNode;
