import { atom, selector } from "recoil";
import {
  containerInspcetListState,
  containerListState,
  containerNetworkListState,
  containerStatsListState,
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
    const containerInspectList = get(containerInspcetListState);
    const containerStatsList = get(containerStatsListState);

    if (!Array.isArray(containerList) || !containerList.length) return [];
    if (!Array.isArray(containerInspectList) || !containerInspectList.length)
      return [];
    if (!Array.isArray(containerStatsList) || !containerStatsList.length)
      return [];

    const containerNode = containerList.map((container) => {
      const containerInspect = containerInspectList[container.Id];
      const containerStats = containerStatsList[container.Id];

      // usage calculation
      const cpuDelta =
        containerStats?.cpu_stats.cpu_usage.total_usage -
        containerStats?.precpu_stats.cpu_usage.total_usage;
      const systemCpuDelta =
        containerStats?.cpu_stats.system_cpu_usage -
        containerStats?.precpu_stats.system_cpu_usage;
      const cpu =
        (cpuDelta / systemCpuDelta) *
        containerStats?.cpu_stats.online_cpus *
        100.0;
      const memory =
        (containerStats?.memory_stats.usage -
          containerStats?.memory_stats.stats.cache) /
        1024 /
        1024;
      const totalMemory = containerStats?.memory_stats.limit / 1024 / 1024;

      return {
        id: container.Id,
        type: "container",
        data: {
          id: container.Id,
          name: container.Name,
          status: container.State.Status,
          // healthyStatus: containerInspect?.State.Health?.Status,
          // cpu,
          // memory,
          // totalMemory,
          processCount: null,
          networkSettings: container.NetworkSettings,
        },
      };
    });

    const containerNetworkList = get(containerNetworkListState);

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

    const edge = containerList.flatMap((container) =>
      Object.entries(container.NetworkSettings.Networks).flatMap(
        ([, value]) => ({
          id: `${container.Id}-${value.NetworkID}`,
          type: "smoothstep",
          source: container.Id,
          sourceHandle: `${container.Id}-${value.NetworkID}`,
          target: value.NetworkID,
        }),
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

    const positionedNodes = graphNodes.map((node) => {
      const position = graphPosition[node.id] ?? { position: { x: 0, y: 0 } };
      return { ...node, ...position };
    });

    return [...positionedNodes, ...graphEdges];
  },
});

export { graphElementState, setGraphPositionState };
