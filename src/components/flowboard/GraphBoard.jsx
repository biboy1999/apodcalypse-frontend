import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ControlButton,
  useStoreState,
} from "react-flow-renderer";
import { Button, Confirm, Icon, Modal } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import ContainerNode from "./ContainerNode";
import NetworkNode from "./NetworkNode";
import updateLayout from "../../utils/GraphUtils";
import { selectedContainerState } from "../../recoil/Container";
import { graphElementState, setGraphPositionState } from "../../recoil/Graph";
import { networksSocket, containersSocket } from "../../recoil/Socketio";
import ContextMenu from "./ContextMenu";

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
  const networkSocket = useRecoilValue(networksSocket);
  const containerSocket = useRecoilValue(containersSocket);
  const setGraphPosition = useSetRecoilState(setGraphPositionState);

  // local state
  const runOnce = useRef(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [elementsToRemove, setElementsToRemove] = useState(null);

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  // reactflow state
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);

  const nodeHasDimension = (el) => el.__rf.width && el.__rf.height;

  const onLayout = async () => {
    const result = await updateLayout([...edges, ...nodes]);
    setGraphPosition(Object.assign({}, ...result));
  };

  const onElementsRemove = (elements) => {
    setConfirmOpen(true);
    setElementsToRemove(elements);
  };

  const elementRemove = (elements) => {
    if (!elements) return;
    setConfirmOpen(false);
    const containerNode = elements.filter(
      (element) => element.type === "container",
    );
    const networkNode = elements.filter(
      (element) => element.type === "network",
    );
    const networkLink = elements.filter(
      (element) => element.type === "smoothstep",
    );

    containerNode.forEach((c) => {
      containerSocket.emit("remove", c.data.id);
      toast.info(`🗑️ Removing Container: ${c.data.id.substring(0, 12)}`);
    });

    networkNode.forEach((n) => {
      networkSocket.emit("remove", n.data.id);
      toast.info(`🗑️ Removing Network: ${n.data.id.substring(0, 12)}`);
    });

    networkLink.forEach((link) => {
      const containerId = link.source;
      const networkId = link.target;
      networkSocket.emit("container_disonnect", containerId, networkId);
      toast.info(`Unlink Container: ${containerId.substring(0, 12)}`);
    });
  };

  const confirmList = (elements) => {
    if (!elements) return "";
    const containerNode = elements.filter(
      (element) => element.type === "container",
    );
    const networkNode = elements.filter(
      (element) => element.type === "network",
    );
    const networkLink = elements.filter(
      (element) => element.type === "smoothstep",
    );
    return (
      <Modal.Content>
        <p>Action can&apos;t be reverted. Are you sure to proceed?</p>
        <div className="ui list">
          {containerNode.length !== 0 && (
            <div className="item">
              <i className="dice d6 icon" />
              <div className="content">
                <div className="header">Containers</div>
                <div className="description">Total {containerNode.length}</div>
                <div className="list">
                  {containerNode.map((e) => (
                    <div className="item" key={e.data.id}>
                      <div className="content">
                        <div className="header">{e.data.name}</div>
                        <div className="description">
                          {e.data.id.substring(0, 12)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {networkNode.length !== 0 && (
            <div className="item">
              <i className="sitemap icon" />
              <div className="content">
                <div className="header">Networks</div>
                <div className="description">Total {networkNode.length}</div>
                <div className="list">
                  {networkNode.map((e) => (
                    <div className="item" key={e.data.id}>
                      <div className="content">
                        <div className="header">{e.data.name}</div>
                        <div className="description">
                          {e.data.id.substring(0, 12)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {networkLink.length !== 0 && (
            <div className="item">
              <i className="linkify icon" />
              <div className="content">
                <div className="header">Links</div>
                <div className="description">Total {networkLink.length}</div>
                <div className="list">
                  {networkLink.map((e) => (
                    <div className="item" key={`${e.source}-${e.target}`}>
                      <div className="content">
                        <div className="header">{`${e.source.substring(
                          0,
                          12,
                        )} - ${e.target.substring(0, 12)}`}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal.Content>
    );
  };

  const memoConfirmList = useMemo(
    () => confirmList(elementsToRemove),
    [elementsToRemove],
  );

  const onConnect = (link) => {
    console.log(link);
    networkSocket.emit("container_connect", link.source, link.target);
    toast.info(
      `Linking Network: ${link.source.substring(
        0,
        12,
      )} - ${link.target.substring(0, 12)}`,
    );
  };

  // on selection change
  const setSelectedContainer = useSetRecoilState(selectedContainerState);
  const onSelectionChange = (e) => {
    setSelectedContainer(
      (prev) => e?.filter((x) => x.type === "container")?.[0] ?? prev,
    );
  };

  const onSelectionContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      setPosX(e.pageX);
      setPosY(e.pageY);
      setShowMenu(true);
    },
    [setPosX, setPosY],
  );

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
      onConnect={onConnect}
      onLoad={onLoad}
      onSelectionChange={onSelectionChange}
      // onSelectionContextMenu={onSelectionContextMenu}
    >
      <Confirm
        open={confirmOpen}
        size="tiny"
        header={
          <Modal.Header>
            <Icon name="exclamation triangle" />
            <span> Confirm</span>
          </Modal.Header>
        }
        confirmButton={<Button negative>Yes</Button>}
        content={() => memoConfirmList}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => elementRemove(elementsToRemove)}
      />
      {/* <ContextMenu open={showMenu} posx={posX} posy={posY} /> */}
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
