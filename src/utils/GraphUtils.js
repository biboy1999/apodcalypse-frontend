import ELK from "elkjs/lib/elk.bundled";
import { isNode } from "react-flow-renderer";

const elk = new ELK({
  // workerUrl: "./elk-worker.min.js",
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.spacing.nodeNode": "100",
    "elk.layered.spacing.nodeNodeBetweenLayers": "100",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.layered.layering.strategy": "MIN_WIDTH",
    "elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
    "elk.spacing.edgeNode": "50",
  },
});

const updateLayout = async (elements) => {
  const DEFAULT_WIDTH = 75;
  const DEFAULT_HEIGHT = 75;
  const nodes = [];
  const edges = [];

  elements.forEach((el) => {
    if (isNode(el)) {
      const portList =
        el.__rf?.handleBounds.source ?? el.__rf?.handleBounds.target ?? [];
      console.log(el.__rf?.handleBounds);
      nodes.push({
        id: el.id,
        // eslint-disable-next-line no-underscore-dangle
        width: el.__rf?.width ?? DEFAULT_WIDTH,
        // eslint-disable-next-line no-underscore-dangle
        height: el.__rf?.height ?? DEFAULT_HEIGHT,
        layoutOptions: {
          portConstraints: "FIXED_ORDER",
          "portAlignment.east": "END",
        },
        ports: [
          ...portList.map((handle, index) => ({
            id: handle.id,
            width: 0,
            height: 0,
            layoutOptions: {
              "port.side": handle.position === "right" ? "EAST" : "NORTH",
              "port.index": index,
            },
          })),
        ],
      });
    } else {
      console.log(el);
      edges.push({
        id: el.id,
        sourcePort: `${el.source}-${el.target}`,
        targetPort: el.target,
        source: el.source,
        target: el.target,
      });
    }
  });

  const newGraph = await elk.layout({
    id: "root",
    children: nodes,
    // eslint-disable-next-line object-shorthand
    edges: edges,
  });

  return elements
    .filter((el) => {
      const node = newGraph?.children?.find((n) => n.id === el.id);
      return isNode(el) && node?.x && node?.y && node?.width && node?.height;
    })
    .map((el) => {
      const node = newGraph?.children?.find((n) => n.id === el.id);
      return {
        [el.id]: {
          position: {
            // hack: slighltiy different position to notify react flow about the change
            x: node.x - node.width / 2 + Math.random() / 1000,
            y: node.y - node.height / 2,
          },
        },
      };
    });
};

export default updateLayout;
