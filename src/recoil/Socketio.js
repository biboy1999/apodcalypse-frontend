import { atom } from "recoil";

const imagesSocket = atom({
  key: "imageSocket",
  default: null,
  dangerouslyAllowMutability: true,
});

const containersSocket = atom({
  key: "containersSocket",
  default: null,
  dangerouslyAllowMutability: true,
});

const networksSocket = atom({
  key: "networksSocket",
  default: null,
  dangerouslyAllowMutability: true,
});

const recipesSocket = atom({
  key: "recipesSocket",
  default: null,
  dangerouslyAllowMutability: true,
});

// eslint-disable-next-line import/prefer-default-export
export { imagesSocket, containersSocket, networksSocket, recipesSocket };
