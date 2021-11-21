import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const ModeSelection = ({ handleModeChoose }) => (
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
            <br />
            Create from scratch
          </Header>
          <Button
            as="label"
            primary
            disabled
            onClick={() => handleModeChoose("create")}
          >
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
            <br />
            Load predefined recipe
          </Header>
          <Button
            as="label"
            primary
            onClick={() => handleModeChoose("predefined")}
          >
            Next
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default ModeSelection;
