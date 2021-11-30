import { atom, selector } from "recoil";
import {
  containerListState,
  containerNetworkListState,
  containerUsageState,
} from "./Container";

const graphPositionState = atom({
  key: "graphPositionState",
  default: {},
});

const setGraphPositionState = selector({
  key: "setGraphPositionState",
  set: ({ set, get }, newPosition) => {
    const graphPosition = get(graphPositionState);
    set(graphPositionState, { ...graphPosition, ...newPosition });
  },
});

const graphNodesState = selector({
  key: "graphNodesState",
  get: ({ get }) => {
    const containerList = get(containerListState);
    // const containerStatsList = get(containerStatsListState);
    const containerNetworkList = get(containerNetworkListState);
    const containerUsage = get(containerUsageState);

    if (!Array.isArray(containerList) || !containerList.length) return [];
    if (Object.keys(containerUsage).length === 0) return [];
    if (!Array.isArray(containerNetworkList) || !containerNetworkList.length)
      return [];

    const containerNode = containerList.map((container) => {
      const stats = containerUsage[container.Id];
      return {
        id: container.Id,
        type: "container",
        data: {
          id: container.Id,
          name: container.Name,
          status: container.State.Status,
          healthyStatus: container.State.Health?.Status,
          cpu: stats?.cpu,
          memory: stats?.memory,
          totalMemory: stats?.totalMemory,
          processCount: null,
          networkSettings: container.NetworkSettings,
        },
      };
    });

    // TODO: multiple network config
    const networkNode = containerNetworkList.map((network) => ({
      id: network.Id,
      type: "network",
      data: {
        id: network.Id,
        name: network.Name,
        driver: network.Driver,
        gateway: network.IPAM.Config[0]?.Gateway,
        subnet: network.IPAM.Config[0]?.Subnet,
      },
    }));
    return [...containerNode, ...networkNode];
  },
});

const graphEdgesState = selector({
  key: "graphEdgesState",
  get: ({ get }) => {
    const containerList = get(containerListState);
    const containerNetworkList = get(containerNetworkListState);

    if (!Array.isArray(containerList) || !containerList.length) return [];
    if (!Array.isArray(containerNetworkList) || !containerNetworkList.length)
      return [];

    const edge = containerList.flatMap((container) =>
      Object.entries(container.NetworkSettings.Networks).flatMap(
        ([, value]) => {
          // check network exist
          if (!containerNetworkList.some((el) => el.Id === value.NetworkID))
            return [];
          return {
            id: `${container.Id}-${value.NetworkID}`,
            type: "smoothstep",
            source: container.Id,
            sourceHandle: `${container.Id}-${value.NetworkID}`,
            target: value.NetworkID,
          };
        },
      ),
    );
    return edge;
  },
});

const graphElementState = selector({
  key: "graphElementState",
  get: ({ get }) => {
    const graphPosition = get(graphPositionState);
    const graphEdges = get(graphEdgesState);
    const graphNodes = get(graphNodesState);

    if (!Array.isArray(graphNodes) || !graphNodes.length) return [];
    if (!Array.isArray(graphEdges) || !graphEdges.length) return [];

    const positionedNodes = graphNodes.map((node) => {
      const position = graphPosition[node.id] ?? { position: { x: 0, y: 0 } };
      //  possiable point
      return { ...node, ...position };
    });

    return [...positionedNodes, ...graphEdges];
  },
});

export { graphElementState, setGraphPositionState };
