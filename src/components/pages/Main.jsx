import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactFlowProvider } from "react-flow-renderer";
import SidebarPanel from "../sidebar/Sidebar";
import GraphBoard from "../flowboard/GraphBoard";
import SidebarMenu from "../sidebar/Menu";
import { selectedMenuItemState } from "../../recoil/Menu";
import {
  containerListState,
  containerNetworkListState,
  containerStatsListState,
} from "../../recoil/Container";
import StatusNag from "../StatusNag";

const Main = () => {
  const selectedMenuItem = useRecoilValue(selectedMenuItemState);

  const setContainerListState = useSetRecoilState(containerListState);
  const setContainerStatsListState = useSetRecoilState(containerStatsListState);
  const setContainerNetworkListState = useSetRecoilState(
    containerNetworkListState,
  );

  const wsContainer = useRef(null);
  const wsNetwork = useRef(null);
  // const wsImage = useRef(null);

  useEffect(() => {
    wsContainer.current = io("http://127.0.0.1:4636/containers");
    wsContainer.current.on("connect", () => {
      console.log(wsContainer.current.id);
    });

    const listTimer = setInterval(() => {
      wsContainer.current.volatile.emit("list", { all: true }, (ack) => {
        // console.log(ack);
        setContainerListState(ack);
      });
    }, 5000);

    const statsTimer = setInterval(() => {
      wsContainer.current.volatile.emit("list_stats", (ack) => {
        // console.log(ack);
        setContainerStatsListState(ack);
      });
    }, 7000);

    return () => {
      clearInterval(listTimer);
      clearInterval(statsTimer);
      wsContainer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    wsNetwork.current = io("http://127.0.0.1:4636/networks");
    wsNetwork.current.on("connect", () => {
      console.log(wsNetwork.current.id);
    });

    const listTimer = setInterval(() => {
      wsNetwork.current.volatile.emit("list", {}, (ack) => {
        // console.log(ack);
        setContainerNetworkListState(ack);
      });
    }, 3000);

    return () => {
      clearInterval(listTimer);
      wsNetwork.current.disconnect();
    };
  }, []);

  return (
    <>
      <div className="app">
        <StatusNag />
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
