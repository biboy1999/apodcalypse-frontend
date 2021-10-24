import { atom, selector } from "recoil";
import {
  containerInspectData,
  containerListData,
  containersStatsData,
  networkListData,
} from "../temp/initial-elements";

const containerListState = atom({
  key: "containerListState",
  default: [],
});

const containerInspcetListState = atom({
  key: "containerInspcetListState",
  default: containerInspectData,
});

const containerStatsListState = atom({
  key: "containerStatsListState",
  default: containersStatsData,
});

const containerNetworkListState = atom({
  key: "containerNetworkListState",
  default: networkListData,
});

const selectedContainerState = atom({
  key: "selectedContainerState",
  default: undefined,
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
  containerInspcetListState,
  selectedContainerState,
  containerStatsListState,
  containerNetworkListState,
  containerPanelListState,
};
