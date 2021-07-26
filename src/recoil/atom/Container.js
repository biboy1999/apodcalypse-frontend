import { atom } from "recoil";

const containerListState = atom({
    key: 'containerListState',
    default: []
});

const selectedContainerState = atom({
    key: 'selectedContainerState',
    default: undefined
});

export {containerListState, selectedContainerState};