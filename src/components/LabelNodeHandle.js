import { Handle } from "react-flow-renderer";
import styled from "styled-components";

const handleDiameter = 15;
const handleRadius = handleDiameter / 2;

const Outline = styled.div`
  position: absolute;
  width: ${handleDiameter}px;
  height: ${handleDiameter}px;
  border-radius: ${handleDiameter}px;
  transition: all 0.5 ease;
  --node-center: calc(50% - ${handleRadius}px);

  ${({ position }) => {
        switch (position) {
            case 'left':
                return `left: 0; top: var(--node-center);`
            case 'right':
                return `right: 0; top: var(--node-center);`
            case 'top':
                return `top: 0; right: var(--node-center);`
            case 'bottom':
                return `bottom: 0; right: var(--node-center);`
            default:
                break;
        }
    }
    }
   // additional position based styles
`;

const CustomNodeHandle = ({ node, id, type, position }) => {
    return (<Outline position={position}><Handle id={id} type={type} position={position} /></Outline>);
}

export default CustomNodeHandle;