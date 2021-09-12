import React, { useState, useEffect } from "react";
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
  // reactflow state
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);

  const onLayout = async () => {
    const result = await updateLayout([...edges, ...nodes]);
    setGraphPosition(Object.assign({}, ...result));
  };

  // const onElementsRemove = (elementsToRemove) =>
  //   setElements((els) => removeElements(elementsToRemove, els));
  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  // on selection change
  const setSelectedContainer = useSetRecoilState(selectedContainerState);
  const onSelectionChange = (e) => {
    setSelectedContainer(
      (prev) => e?.filter((x) => x.type === "container")?.[0] ?? prev,
    );
  };

  return (
    <ReactFlow
      elements={reactFlowElement}
      nodeTypes={nodeTypes}
      // onElementsRemove={onElementsRemove}
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
