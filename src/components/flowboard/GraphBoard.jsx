import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ControlButton,
  useUpdateNodeInternals,
  ReactFlowProvider,
  useStoreState,
} from "react-flow-renderer";
import { Icon } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import ContainerNode from "./ContainerNode";
import { selectedContainerState } from "../../recoil/Container";
import NetworkNode from "./NetworkNode";
import { graphElementState, setGraphPositionState } from "../../recoil/Graph";
import updateLayout from "../../utils/GraphUtils";

const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const nodeTypes = {
  container: ContainerNode,
  network: NetworkNode,
};

const GraphBaord = () => {
  // external state
  const reactFlowElement = useRecoilValue(graphElementState);
  const setGraphPosition = useSetRecoilState(setGraphPositionState);

  // local state
  const runOnce = useRef(false);

  // reactflow state
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);

  const nodeHasDimension = (el) => el.__rf.width && el.__rf.height;

  const onLayout = async () => {
    const result = await updateLayout([...edges, ...nodes]);
    setGraphPosition(Object.assign({}, ...result));
  };

  const onElementsRemove = (elementsToRemove) => console.log(elementsToRemove);
  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  // on selection change
  const setSelectedContainer = useSetRecoilState(selectedContainerState);
  const onSelectionChange = (e) => {
    setSelectedContainer(
      (prev) => e?.filter((x) => x.type === "container")?.[0] ?? prev,
    );
  };

  useEffect(() => {
    if (
      !runOnce.current &&
      nodes.length !== 0 &&
      nodes.every(nodeHasDimension)
    ) {
      const update = async () => {
        await onLayout();
      };
      update();
      runOnce.current = true;
    }
  }, [nodes, edges]);

  return (
    <ReactFlow
      elements={reactFlowElement}
      nodeTypes={nodeTypes}
      onElementsRemove={onElementsRemove}
      // onConnect={onConnect}
      onLoad={onLoad}
      onSelectionChange={onSelectionChange}
    >
      <Controls style={{ left: "220px", bottom: "51px" }}>
        <ControlButton onClick={() => onLayout()}>
          <Icon name="project diagram" />
        </ControlButton>
      </Controls>
      <MiniMap style={{ left: "10px", bottom: "10px" }} />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default GraphBaord;
