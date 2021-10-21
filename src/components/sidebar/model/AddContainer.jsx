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
  Accordion,
  Popup,
} from "semantic-ui-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const capList = [
  [
    "AUDIT_CONTROL",
    " 	Enable and disable kernel auditing; change auditing filter rules; retrieve auditing status and filtering rules.",
  ],
  ["AUDIT_READ", " 	Allow reading the audit log via multicast netlink socket."],
  ["BLOCK_SUSPEND", " 	Allow preventing system suspends."],
  [
    "BPF",
    " 	Allow creating BPF maps, loading BPF Type Format (BTF) data, retrieve JITed code of BPF programs, and more.",
  ],
  [
    "CHECKPOINT_RESTORE",
    " 	Allow checkpoint/restore related operations. Introduced in kernel 5.9.",
  ],
  [
    "DAC_READ_SEARCH",
    " 	Bypass file read permission checks and directory read and execute permission checks.",
  ],
  ["IPC_LOCK", " 	Lock memory (mlock(2), mlockall(2), mmap(2), shmctl(2))."],
  [
    "IPC_OWNER",
    " 	Bypass permission checks for operations on System V IPC objects.",
  ],
  ["LEASE", " 	Establish leases on arbitrary files (see fcntl(2))."],
  [
    "LINUX_IMMUTABLE",
    " 	Set the FS_APPEND_FL and FS_IMMUTABLE_FL i-node flags.",
  ],
  [
    "MAC_ADMIN",
    " 	Allow MAC configuration or state changes. Implemented for the Smack LSM.",
  ],
  [
    "MAC_OVERRIDE",
    " 	Override Mandatory Access Control (MAC). Implemented for the Smack Linux Security Module (LSM).",
  ],
  ["NET_ADMIN", " 	Perform various network-related operations."],
  ["NET_BROADCAST", " 	Make socket broadcasts, and listen to multicasts."],
  [
    "PERFMON",
    " 	Allow system performance and observability privileged operations using perf_events, i915_perf and other kernel subsystems",
  ],
  ["SYS_ADMIN", " 	Perform a range of system administration operations."],
  [
    "SYS_BOOT",
    " 	Use reboot(2) and kexec_load(2), reboot and load a new kernel for later execution.",
  ],
  ["SYS_MODULE", " 	Load and unload kernel modules."],
  [
    "SYS_NICE",
    " 	Raise process nice value (nice(2), setpriority(2)) and change the nice value for arbitrary processes.",
  ],
  ["SYS_PACCT", " 	Use acct(2), switch process accounting on or off."],
  ["SYS_PTRACE", " 	Trace arbitrary processes using ptrace(2)."],
  ["SYS_RAWIO", " 	Perform I/O port operations (iopl(2) and ioperm(2))."],
  ["SYS_RESOURCE", " 	Override resource Limits."],
  [
    "SYS_TIME",
    " 	Set system clock (settimeofday(2), stime(2), adjtimex(2)); set real-time (hardware) clock.",
  ],
  [
    "SYS_TTY_CONFIG",
    " 	Use vhangup(2); employ various privileged ioctl(2) operations on virtual terminals.",
  ],
  ["SYSLOG", " 	Perform privileged syslog(2) operations."],
  ["WAKE_ALARM", " 	Trigger something that will wake up the system."],
];

// eslint-disable-next-line react/prop-types
const AddContainer = ({ trigger }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const { handleSubmit, control, register } = useForm();
  const onSubmit = (data) => console.log(data);

  const {
    fields: envFields,
    append: envAppend,
    remove: envRemove,
  } = useFieldArray({
    control,
    name: "env",
  });

  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  //   {
  //     control,
  //     name: "env",
  //   },
  // );

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
      <Controller
        name="name"
        control={control}
        defaultvalue=""
        render={({ field }) => (
          <Form.Input
            label="name"
            placeholder="helloWorld"
            width="16"
            {...field}
          />
        )}
      />
      <Divider />
      <Header>Environment variable</Header>
      <Button onClick={() => envAppend({ key: "" })} type="button" positive>
        Add variable
      </Button>
      {envFields.map((item, index) => (
        <Form.Group key={item.id} widths="equal">
          <Controller
            name={`env.${index}.key`}
            control={control}
            defaultvalue=""
            render={({ field }) => (
              <Form.Input label="key" placeholder="PATH" {...field} />
            )}
          />
          <Controller
            name={`env.${index}.value`}
            control={control}
            defaultvalue=""
            render={({ field }) => (
              <Form.Input label="value" placeholder="/bin" {...field} />
            )}
          />
          <Button
            negative
            type="button"
            icon="trash"
            onClick={() => envRemove(index)}
          />
        </Form.Group>
      ))}
      <Divider />
      <Header>Capabilities</Header>
      <Accordion
        as={Form.Field}
        panels={[
          {
            key: "cap",
            title: "Advanced",
            content: capList.map((x) => (
              <>
                <Popup
                  key={x[0]}
                  content={x[1]}
                  trigger={
                    <input type="checkbox" id={x[0]} {...register(x[0])} />
                  }
                />
                <lable htmlFor={x[0]}> {x[0]}</lable>
                <br />
              </>
              // <Controller
              //   key={x[0]}
              //   name={x[0]}
              //   control={control}
              //   defaultvalue=""
              //   render={({ field }) => (
              //     <Popup
              //       key={x[0]}
              //       content={x[1]}
              //       trigger={<Form.Checkbox toggle label={x[0]} {...field} />}
              //     />
              //   )}
              // />
              // <Popup
              //   key={x[0]}
              //   content={x[1]}
              //   trigger={
              //     <Form.Checkbox toggle label={x[0]}   {...register(x[0])} />
              //   }
              // />
            )),
          },
        ]}
      />
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
          <Form onSubmit={handleSubmit(onSubmit)} id="createcontainerform">
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() =>
              setSelectedStep((prev) => (prev === 0 ? prev : prev - 1))
            }
          >
            <Icon name="angle left" />
            Back
          </Button>
          <Button
            positive
            onClick={() =>
              setSelectedStep((prev) => (prev === 2 ? prev : prev + 1))
            }
          >
            Next
            <Icon name="angle right" />
          </Button>
          <Button positive form="createcontainerform">
            <Icon name="plus" />
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default AddContainer;
