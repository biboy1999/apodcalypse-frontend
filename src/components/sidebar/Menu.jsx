import { useRecoilValue, useSetRecoilState } from "recoil";
import { Icon, Menu, Divider } from "semantic-ui-react";
import { selectedContainerState } from "../../recoil/Container";
import { selectedMenuItemState } from "../../recoil/Menu";
import ContainersPanel from "./panel/ContainersPanel";
import ImagePanel from "./panel/ImagesPanel";
import OverviewPanel from "./panel/OverviewPanel";
import AttachPanel from "./panel/AttachPanel";
import StatusPanel from "./panel/StatusPanel";
import AddImage from "./model/AddImage";
import AddContainer from "./model/AddContainer";

const menuItems = [
  {
    key: "overview",
    type: "host",
    name: "Overview",
    icon: "desktop",
    panel: <OverviewPanel />,
  },
  {
    key: "containers",
    type: "host",
    name: "Containers",
    icon: "dice d6",
    panel: <ContainersPanel />,
  },
  {
    key: "images",
    type: "host",
    name: "Images",
    icon: "window restore",
    panel: <ImagePanel />,
  },
  { key: "networks", type: "host", name: "Networks", icon: "sitemap" },
  {
    key: "status",
    type: "container",
    name: "Status",
    icon: "chart area",
    panel: <StatusPanel />,
  },
  {
    key: "terminal",
    type: "container",
    name: "Terminal",
    icon: "terminal",
    panel: <AttachPanel />,
  },
  { key: "logs", type: "container", name: "Logs", icon: "stream" },
  { key: "inspect", type: "container", name: "Inspect", icon: "search" },
  { key: "setting", type: "container", name: "Settings", icon: "wrench" },

  {
    key: "CreateContainer",
    type: "action",
    name: "Create Container",
    icon: "dice d6",
    cornerIcon: "add",
    panel: (trigger) => (
      <AddContainer key="CreateContainer" trigger={trigger} />
    ),
  },
  {
    key: "CreateImage",
    type: "action",
    name: "Create Images",
    icon: "window restore",
    cornerIcon: "add",
    panel: (trigger) => <AddImage key="CreateImage" trigger={trigger} />,
  },
];
// eslint-disable-next-line react/prop-types
const SidebarMenu = ({ selectedPanel }) => {
  const setSelectedMenuItem = useSetRecoilState(selectedMenuItemState);

  const handleMouseClickPanel = (e, { _key }) => {
    setSelectedMenuItem((prev) => {
      if (prev.key === _key)
        return { key: false, type: false, name: false, panel: null, icon: "" };
      return menuItems.find((x) => x.key === _key);
    });
  };

  const handleMouseClickModel = (e, { _key }) => {
    console.log("clicking");
    // menuItems.find((x) => x.key === _key).panel(true);
    // setSelectedMenuItem((prev) => {
    //   if (prev.key === _key)
    //     return { key: false, type: false, name: false, panel: null, icon: "" };
    //   return menuItems.find((x) => x.key === _key);
    // });
  };

  const selectedContainer = useRecoilValue(selectedContainerState);

  return (
    <Menu icon vertical compact>
      {menuItems
        .filter((item) => item.type === "host")
        .map((item) => (
          <Menu.Item
            key={item.key}
            _key={item.key}
            name={item.name}
            active={selectedPanel === item.name}
            onClick={handleMouseClickPanel}
          >
            <div>
              <Icon.Group>
                <Icon name={item.icon} size="large" />
                {item.cornerIcon && <Icon name={item.cornerIcon} corner />}
              </Icon.Group>
            </div>
          </Menu.Item>
        ))}
      <Divider fitted />
      <Divider hidden />
      {menuItems
        .filter((item) => item.type === "container")
        .map((item) => (
          <Menu.Item
            key={item.key}
            _key={item.key}
            name={item.name}
            active={selectedPanel === item.name}
            onClick={handleMouseClickPanel}
            disabled={!selectedContainer}
          >
            <div>
              <Icon.Group>
                <Icon name={item.icon} size="large" />
                {item.cornerIcon && <Icon name={item.cornerIcon} corner />}
              </Icon.Group>
            </div>
          </Menu.Item>
        ))}
      <Divider fitted />
      <Divider hidden />
      {menuItems
        .filter((item) => item.type === "action")
        .map((item) =>
          item.panel(
            <Menu.Item
              key={item.key}
              _key={item.key}
              name={item.name}
              active={selectedPanel === item.name}
              onClick={handleMouseClickModel}
            >
              <div>
                <Icon.Group>
                  <Icon name={item.icon} size="large" />
                  {item.cornerIcon && <Icon name={item.cornerIcon} corner />}
                </Icon.Group>
              </div>
            </Menu.Item>,
          ),
        )}
    </Menu>
  );
};

export default SidebarMenu;
