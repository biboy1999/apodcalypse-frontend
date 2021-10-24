import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactFlowProvider } from "react-flow-renderer";
import SidebarPanel from "../sidebar/Sidebar";
import GraphBoard from "../flowboard/GraphBoard";
import SidebarMenu from "../sidebar/Menu";
import { selectedMenuItemState } from "../../recoil/Menu";
import { containerListState } from "../../recoil/Container";

const Main = () => {
  const selectedMenuItem = useRecoilValue(selectedMenuItemState);

  const setContainerListState = useSetRecoilState(containerListState);

  const ws = useRef(null);
  useEffect(() => {
    ws.current = io("http://192.168.43.115:4636/containers");
    ws.current.on("connect", () => {
      console.log(ws.current.id);
    });

    return () => {
      ws.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      ws.current.emit("list", { all: true }, (ack) => {
        console.log(ack);
        setContainerListState(ack);
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="app">
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
