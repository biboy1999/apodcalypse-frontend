import PropTypes from "prop-types";
import { Handle } from "react-flow-renderer";
import styled from "styled-components";

const CustomHandle = styled(Handle)`
  position: absolute;
  width: 25px;
  height: calc(100% - 4px);
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border: medium none;
  transform: translateY(0px);
  top: 2px;

  ${({ position }) => {
    switch (position) {
      case "right":
        return `border-radius: 0px 10px 10px 0px;
        right: -36px;`;
      case "left":
        return `border-radius: 10px 0px 0px 10px;
        left: -26px;`;
      default:
        return "";
    }
  }}
`;

const CustomNodeHandle = ({
  id,
  type,
  position,
  isConnectable = true,
  backgroundcolor = "#718792",
}) => (
  <CustomHandle
    position={position}
    id={id}
    type={type}
    isConnectable={isConnectable}
    backgroundcolor={backgroundcolor}
  />
);

CustomNodeHandle.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  isConnectable: PropTypes.bool,
  backgroundcolor: PropTypes.string,
};

CustomNodeHandle.defaultProps = {
  isConnectable: true,
  backgroundcolor: "#718792",
};

export default CustomNodeHandle;
