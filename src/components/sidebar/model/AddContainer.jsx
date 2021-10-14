import { useState } from "react";
import {
  Modal,
  Icon,
  Form,
  Divider,
  Header,
  Segment,
  Step,
} from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const AddContainer = ({ trigger }) => {
  const [selectedStep, setSelectedStep] = useState("container");
  return (
    <>
      <Modal size="fullscreen" trigger={trigger}>
        <Modal.Header>
          <Icon.Group>
            <Icon name="dice d6" />
            <Icon name="add" corner />
          </Icon.Group>
          <span> Add Container</span>
        </Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Step.Group fluid attached="top">
              <Step
                link
                active={selectedStep === "image"}
                onClick={() => setSelectedStep("image")}
              >
                <Icon name="window restore" />
                <Step.Content>
                  <Step.Title>Image</Step.Title>
                  <Step.Description>Image Setting</Step.Description>
                </Step.Content>
              </Step>
              <Step
                link
                active={selectedStep === "container"}
                onClick={() => setSelectedStep("container")}
              >
                <Icon name="dice d6" />
                <Step.Content>
                  <Step.Title>Container</Step.Title>
                  <Step.Description>
                    Environment variable, capabilities
                  </Step.Description>
                </Step.Content>
              </Step>
              <Step
                link
                active={selectedStep === "network"}
                onClick={() => setSelectedStep("network")}
              >
                <Icon name="sitemap" />
                <Step.Content>
                  <Step.Title>Network</Step.Title>
                  <Step.Description>Port Expose, IP Address</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            {selectedStep === "image" && <Segment attached>image</Segment>}
            {selectedStep === "container" && (
              <Segment attached>container</Segment>
            )}
            {selectedStep === "network" && <Segment attached>network</Segment>}
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default AddContainer;
