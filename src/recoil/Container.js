import { atom, selector } from "recoil";

const containerListState = atom({
  key: "containerListState",
  default: [],
});

const containerStatsListState = atom({
  key: "containerStatsListState",
  default: [],
});

const containerNetworkListState = atom({
  key: "containerNetworkListState",
  default: [],
});

const imagesListState = atom({
  key: "imagesListState",
  default: [],
});

const selectedContainerState = atom({
  key: "selectedContainerState",
  default: undefined,
});

// container usage
const containerUsageState = selector({
  key: "containerUsageState",
  get: ({ get }) => {
    const containerStatsList = get(containerStatsListState);
    return Object.entries(containerStatsList).reduce((result, [key, value]) => {
      // usage calculation
      const cpuDelta =
        value?.cpu_stats.cpu_usage.total_usage -
        value?.precpu_stats.cpu_usage.total_usage;
      const systemCpuDelta =
        value?.cpu_stats.system_cpu_usage -
        value?.precpu_stats.system_cpu_usage;
      const cpu =
        (cpuDelta / systemCpuDelta) * value?.cpu_stats.online_cpus * 100.0;
      const memory =
        (value?.memory_stats.usage - value?.memory_stats.stats?.cache) /
        1024 /
        1024;
      const totalMemory = value?.memory_stats.limit / 1024 / 1024;

      // eslint-disable-next-line no-param-reassign
      result[key] = {
        name: value.name,
        cpu: cpu || 0,
        memory: Math.round(memory) || 0,
        totalMemory: Math.round(totalMemory) || 0,
      };
      return result;
    }, {});
  },
});

// side panel
const containerPanelListState = selector({
  key: "containerPanelListState",
  get: ({ get }) => {
    const containerList = get(containerListState);

    return containerList.map((container) => ({
      id: container.Id,
      name: container.Names.join(","),
      state: container.State,
      image: container.Image,
    }));
  },
});

export {
  containerListState,
  selectedContainerState,
  containerStatsListState,
  imagesListState,
  containerUsageState,
  containerNetworkListState,
  containerPanelListState,
};
