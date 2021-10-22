import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { ReactFlowProvider } from "react-flow-renderer";
import SidebarPanel from "../sidebar/Sidebar";
import GraphBoard from "../flowboard/GraphBoard";
import SidebarMenu from "../sidebar/Menu";
import { selectedMenuItemState } from "../../recoil/Menu";

const Main = () => {
  const selectedMenuItem = useRecoilValue(selectedMenuItemState);

  const ws = useRef(null);
  useEffect(() => {
    ws.current = io("http://localhost:4636/containers");
    ws.current.on("connect", () => {
      console.log(ws.current.id);
    });

    ws.current.on("list", (args) => {
      console.log(args);
    });

    // return () => {
    //   ws.current.disconnect();
    // };
  }, []);

  // useEffect(() => {
  //   ws.current.emit("list", {all: true});
  // }, []);

  return (
    <>
      <div className="app">
        <button
          type="button"
          onClick={() =>
            ws.current.emit("list", { all: true }, (ack) => {
              console.log(ack);
            })
          }
        >
          test
        </button>
        <Sidebar.Pushable style={{ flexGrow: "1" }}>
          <Sidebar
            animation="overlay"
            direction="right"
            visible={!!selectedMenuItem.name}
            className="with-toolbar"
            style={{ overflow: "hidden" }}
          >
            <SidebarPanel selectedPanel={selectedMenuItem} />
          </Sidebar>
          <Sidebar.Pusher style={{ height: "100%" }}>
            <ReactFlowProvider>
              <GraphBoard />
            </ReactFlowProvider>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <SidebarMenu selectedPanel={selectedMenuItem.name} />
      </div>
    </>
  );
};

export default Main;
