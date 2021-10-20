import { useState } from "react";
import {
  Modal,
  Icon,
  Form,
  Divider,
  Header,
  Segment,
  Step,
  Button,
} from "semantic-ui-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const AddContainer = ({ trigger }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const { handleSubmit, control, register } = useForm();
  const onSubmit = (data) => console.log(data);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "env",
    },
  );

  const imageForm = (
    <Segment attached>
      <Controller
        name="Registry"
        control={control}
        defaultvalue=""
        render={({ field }) => (
          <Form.Input
            label="Registry"
            placeholder="docker.io"
            width="16"
            {...field}
          />
        )}
      />

      <Controller
        name="Image"
        control={control}
        defaultvalue=""
        render={({ field }) => (
          <Form.Input
            label="Image"
            placeholder="hello-world:latest"
            width="16"
            {...field}
          />
        )}
      />
    </Segment>
  );

  const containerForm = (
    <Segment attached>
      {/* <Form.Input label="name" placeholder="hello-world" width="16" /> */}
      {/* <Form.Input label="Image" placeholder="hello-world:latest" width="16" /> */}
      <div>Environment variable</div>
      <Button onClick={() => append({ key: "" })} type="button" positive>
        Add variable
      </Button>
      <Form.Group widths="equal">
        {fields.map((field, index) => (
          <input key={field.id} {...register(`env.${index}.key`)} />
        ))}
      </Form.Group>
    </Segment>
  );

  const networkForm = (
    <Segment attached>
      <Form.Input label="Registry" placeholder="docker.io" width="16" />
      <Form.Input label="Image" placeholder="hello-world:latest" width="16" />
    </Segment>
  );

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Step.Group fluid attached="top">
              <Step
                link
                active={selectedStep === 0}
                onClick={() => setSelectedStep(0)}
              >
                <Icon name="window restore" />
                <Step.Content>
                  <Step.Title>Image</Step.Title>
                  <Step.Description>Image config.</Step.Description>
                </Step.Content>
              </Step>
              <Step
                link
                active={selectedStep === 1}
                onClick={() => setSelectedStep(1)}
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
                active={selectedStep === 2}
                onClick={() => setSelectedStep(2)}
              >
                <Icon name="sitemap" />
                <Step.Content>
                  <Step.Title>Network</Step.Title>
                  <Step.Description>Port Expose, IP Address</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            {selectedStep === 0 && imageForm}
            {selectedStep === 1 && containerForm}
            {selectedStep === 2 && networkForm}
            <input type="submit" />
          </Form>
          <Button
            floated="right"
            positive
            onClick={() =>
              setSelectedStep((prev) => (prev === 2 ? prev : prev + 1))
            }
          >
            Next
          </Button>
          <Button
            floated="right"
            onClick={() =>
              setSelectedStep((prev) => (prev === 0 ? prev : prev - 1))
            }
          >
            Back
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default AddContainer;
