import { atom } from "recoil";

const selectedMenuItemState = atom({
  key: "selectedMenuItemState",
  default: { key: false, name: false, panel: undefined },
});

// eslint-disable-next-line import/prefer-default-export
export { selectedMenuItemState };
