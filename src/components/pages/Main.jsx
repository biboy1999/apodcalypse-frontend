import React, { useEffect } from "react";
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

  useEffect(() => {
    const wsContainer = io("http://127.0.0.1:4636/containers");

    wsContainer.on("connect", () => {
      console.log(wsContainer.id);
    });

    const listTimer = setInterval(() => {
      wsContainer.volatile.emit("list", { all: true }, (ack) => {
        // console.log(ack);
        setContainerListState(ack);
      });
    }, 5000);

    const statsTimer = setInterval(() => {
      wsContainer.volatile.emit("list_stats", (ack) => {
        // console.log(ack);
        setContainerStatsListState(ack);
      });
    }, 7000);

    setContainerSocket(wsContainer);

    return () => {
      clearInterval(listTimer);
      clearInterval(statsTimer);
      wsContainer.disconnect();
    };
  }, []);

  useEffect(() => {
    const wsNetwork = io("http://127.0.0.1:4636/networks");
    wsNetwork.on("connect", () => {
      console.log(wsNetwork.id);
    });

    const listTimer = setInterval(() => {
      wsNetwork.volatile.emit("list", {}, (ack) => {
        setContainerNetworkListState(ack);
      });
    }, 3000);

    setNetworksSocket(wsNetwork);

    return () => {
      clearInterval(listTimer);
      wsNetwork.disconnect();
    };
  }, []);

  useEffect(() => {
    const wsImage = io("http://127.0.0.1:4636/images");
    wsImage.on("connect", () => {
      console.log(wsImage.id);
    });

    const listTimer = setInterval(() => {
      wsImage.volatile.emit("list", (ack) => {
        setImagesListState(ack);
      });
    }, 4000);

    setImagesSocket(wsImage);

    return () => {
      clearInterval(listTimer);
      wsImage.disconnect();
    };
  }, []);

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
        toast.info(msg.message);
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
