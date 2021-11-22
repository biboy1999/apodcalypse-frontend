import React, { useEffect } from "react";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Main from "./components/pages/Main";

// function DebugObserver() {
//   const snapshot = useRecoilSnapshot();
//   useEffect(() => {
//     console.debug("The following atoms were modified:");
//     // eslint-disable-next-line no-restricted-syntax
//     for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
//       console.debug(node.key, snapshot.getLoadable(node));
//     }
//   }, [snapshot]);
//   return null;
// }

const App = () => (
  <RecoilRoot>
    {/* <DebugObserver /> */}
    <ToastContainer position="top-left" />
    <Main />
  </RecoilRoot>
);

export default App;
