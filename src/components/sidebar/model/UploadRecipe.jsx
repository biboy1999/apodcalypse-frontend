import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Modal,
  Icon,
  Button,
  Header,
  Grid,
  Segment,
  Input,
} from "semantic-ui-react";
import { recipesSocket } from "../../../recoil/Socketio";
// eslint-disable-next-line react/prop-types
const UploadRecipe = ({ trigger }) => {
  const recipeSocket = useRecoilValue(recipesSocket);

  const handleFiles = ({ target: { files } }) => {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        recipeSocket.emit("upload", evt.target.result);
      };
      console.log("sended");
      reader.readAsArrayBuffer(files[0]);
    }
  };

  return (
    <>
      <Modal size="large" trigger={trigger}>
        <Modal.Header>
          <Icon.Group>
            <Icon name="window restore" />
            <Icon name="add" corner />
          </Icon.Group>
          <span> Recipe Wizard</span>
        </Modal.Header>
        <Modal.Content scrolling>
          <Segment placeholder>
            <Grid columns="2" stackable textAlign="center">
              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header>
                    <div>
                      <Icon.Group size="huge">
                        <Icon name="upload" />
                        <Icon corner="bottom right" name="scroll" />
                      </Icon.Group>
                    </div>
                    <br />
                    Upload recipe zip
                  </Header>
                  <Input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFiles}
                  />
                  <Button as="label" primary htmlFor="file-upload">
                    Select File
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default UploadRecipe;
