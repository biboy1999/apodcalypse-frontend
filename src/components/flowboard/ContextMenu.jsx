/* eslint-disable react/prop-types */
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

const ColorSpan = styled.span`
  color: ${({ color }) => color};
`;

const ContextMenu = ({
  open,
  posx,
  posy,
  startContainer,
  stopContainer,
  //   deleteContainer,
  //   deleteNetwork,
}) =>
  open && (
    <CustomMenu vertical posx={posx} posy={posy}>
      <CustomMenu.Item>
        <CustomMenu.Header>Container</CustomMenu.Header>
        <CustomMenu.Menu>
          <CustomMenu.Item onClick={startContainer}>
            <ColorSpan color="Green">Start Selected</ColorSpan>
          </CustomMenu.Item>
          <CustomMenu.Item onClick={stopContainer}>
            <ColorSpan color="Orange">Stop Selected</ColorSpan>
          </CustomMenu.Item>
          {/* <CustomMenu.Item onClick={() => deleteContainer}>
            <ColorSpan color="red">Delete Selected</ColorSpan>
          </CustomMenu.Item> */}
        </CustomMenu.Menu>
      </CustomMenu.Item>
      {/* <CustomMenu.Item>
        <CustomMenu.Header>Network</CustomMenu.Header>
        <CustomMenu.Menu>
          <CustomMenu.Item onClick={() => deleteNetwork()}>
            <ColorSpan color="red">Delete Selected</ColorSpan>
          </CustomMenu.Item>
        </CustomMenu.Menu>
      </CustomMenu.Item> */}
    </CustomMenu>
  );

export default ContextMenu;
