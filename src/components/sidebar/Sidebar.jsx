import { Header } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { selectedContainerState } from "../../recoil/Container";

const SidebarPanel = ({ selectedPanel }) => {
  const selectedContainer = useRecoilValue(selectedContainerState);

  return (
    <div className="grid-container">
      <div className="infotitlebar">
        <Header as="h3">
          {selectedPanel.name}
          <Header.Subheader>
            {selectedPanel.type === "host"
              ? "Hostname"
              : selectedContainer?.data.name}
          </Header.Subheader>
        </Header>
      </div>
      {selectedPanel.panel}
    </div>
  );
};

SidebarPanel.propTypes = {
  selectedPanel: PropTypes.shape({
    key: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    panel: PropTypes.element,
  }).isRequired,
};

export default SidebarPanel;
