import styled from "styled-components";
import { Menu } from "semantic-ui-react";

// const ContextMenu = ({ open, Xpos, Ypos }) => {};
const CustomMenu = styled(Menu)`
  position: absolute;
  width: 50px;
  left: ${({ posx }) => posx}px;
  top: ${({ posy }) => posy}px;
  z-index: 1000;
`;

// eslint-disable-next-line react/prop-types
const ContextMenu = ({ open, posx, posy }) =>
  open && (
    <CustomMenu vertical posx={posx} posy={posy}>
      <CustomMenu.Item>
        <CustomMenu.Header>Container</CustomMenu.Header>
        <CustomMenu.Menu>
          <CustomMenu.Item name="Stop Selected" />
          <CustomMenu.Item name="Start Selected" />
          <CustomMenu.Item name="Delete Selected" />
        </CustomMenu.Menu>
      </CustomMenu.Item>
      <CustomMenu.Item>
        <CustomMenu.Header>Network</CustomMenu.Header>
        <CustomMenu.Menu>
          <CustomMenu.Item>
            <span color="red">Delete Selected</span>
          </CustomMenu.Item>
        </CustomMenu.Menu>
      </CustomMenu.Item>
    </CustomMenu>
  );

export default ContextMenu;
