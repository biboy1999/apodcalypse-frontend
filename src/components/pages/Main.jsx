import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Sidebar } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactFlowProvider } from "react-flow-renderer";
import { toast } from "react-toastify";
import SidebarPanel from "../sidebar/Sidebar";
import GraphBoard from "../flowboard/GraphBoard";
import SidebarMenu from "../sidebar/Menu";
import { selectedMenuItemState } from "../../recoil/Menu";
import {
  containerListState,
  containerNetworkListState,
  containerStatsListState,
  imagesListState,
} from "../../recoil/Container";
import {
  containersSocket,
  imagesSocket,
  networksSocket,
  recipesSocket,
} from "../../recoil/Socketio";
import StatusNag from "../StatusNag";
import SocketStatusNag from "../SocketStatusNag";
import formatter from "../../utils/Message";

const Main = () => {
  const selectedMenuItem = useRecoilValue(selectedMenuItemState);

  const setContainerListState = useSetRecoilState(containerListState);
  const setContainerStatsListState = useSetRecoilState(containerStatsListState);
  const setContainerNetworkListState = useSetRecoilState(
    containerNetworkListState,
  );
  const setImagesListState = useSetRecoilState(imagesListState);

  const recipeSocket = useRecoilValue(recipesSocket);
  const setContainerSocket = useSetRecoilState(containersSocket);
  const setImagesSocket = useSetRecoilState(imagesSocket);
  const setNetworksSocket = useSetRecoilState(networksSocket);
  const setRecipesSocket = useSetRecoilState(recipesSocket);

  const [isConnected, setIsConnected] = useState(false);

  // container listener
  useEffect(() => {
    const wsContainer = io("http://127.0.0.1:4636/containers");

    wsContainer.on("connect", () => {
      console.log(wsContainer.id);
      setIsConnected(true);
    });

    wsContainer.on("disconnect", () => {
      setIsConnected(false);
    });

    let waitList = false;
    const listTimer = setInterval(() => {
      if (!waitList) {
        wsContainer.emit("list", { all: true }, (ack) => {
          setContainerListState(ack);
          waitList = false;
        });
        waitList = true;
      }
    }, 1000);

    let waitStats = false;
    const statsTimer = setInterval(() => {
      if (!waitStats) {
        wsContainer.emit("list_stats", (ack) => {
          setContainerStatsListState(ack);
          waitStats = false;
        });
        waitStats = true;
      }
    }, 1000);

    setContainerSocket(wsContainer);

    return () => {
      clearInterval(listTimer);
      clearInterval(statsTimer);
      wsContainer.disconnect();
    };
  }, []);

  // network listener
  useEffect(() => {
    const wsNetwork = io("http://127.0.0.1:4636/networks");
    wsNetwork.on("connect", () => {
      console.log(wsNetwork.id);
    });

    let waitList = false;
    const listTimer = setInterval(() => {
      if (!waitList) {
        wsNetwork.emit("list", {}, (ack) => {
          setContainerNetworkListState(ack);
          waitList = false;
        });
        waitList = true;
      }
    }, 1000);

    setNetworksSocket(wsNetwork);

    return () => {
      clearInterval(listTimer);
      wsNetwork.disconnect();
    };
  }, []);

  // image listener
  useEffect(() => {
    const wsImage = io("http://127.0.0.1:4636/images");
    wsImage.on("connect", () => {
      console.log(wsImage.id);
    });

    let waitList = false;
    const listTimer = setInterval(() => {
      if (!waitList) {
        wsImage.emit("list", (ack) => {
          setImagesListState(ack);
          waitList = false;
        });
        waitList = true;
      }
    }, 1000);

    setImagesSocket(wsImage);

    return () => {
      clearInterval(listTimer);
      wsImage.disconnect();
    };
  }, []);

  // recipe listener
  useEffect(() => {
    const wsRecipe = io("http://127.0.0.1:4636/recipes");
    wsRecipe.on("connect", () => {
      console.log(wsRecipe.id);
    });

    setRecipesSocket(wsRecipe);

    return () => {
      wsRecipe.disconnect();
    };
  }, []);

  useEffect(() => {
    if (recipeSocket) {
      recipeSocket.on("message", (msg) => {
        toast.info(formatter(msg.message));
      });
    }
    return () => {
      if (recipeSocket) {
        recipeSocket.removeAllListeners("message");
      }
    };
  }, [recipeSocket]);

  return (
    <>
      <div className="app">
        <StatusNag />
        <SocketStatusNag visable={isConnected} />
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
