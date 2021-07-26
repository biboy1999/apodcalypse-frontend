import { Button, Icon, Header } from "semantic-ui-react";
import { useRecoilValue } from "recoil";

import { selectedContainerState } from "../../recoil/atom/Container";
import OverviewInfo from "./OverviewInfo/OverviewInfo";
import ContainerInfo from "./ContainerInfo/ContainerInfo"

const SideInfoBar = (props) => {
  const selectedContainer = useRecoilValue(selectedContainerState);

  return (
    <div className='grid-container'>
      <div className='infosidebarbutton'>
        <Button
          icon
          size='big'
          onClick={() => props.onButtonClick()}
        >
          {/* <Icon name={props.sideBarVisible ? 'angle double right' : 'angle double left'} /> */}
          <Icon name='bars' />
        </Button>
      </div>
      <div className='infotoolbar'></div>
      <div className='infotitlebar'>
        <Header as='h3'>
          {selectedContainer?.data.name ?? 'Dashboard'}
          <Header.Subheader>
            {selectedContainer?.data.id ?? 'Hostname'}
          </Header.Subheader>
        </Header>
      </div>

      <div className='infosidebar'>
        {selectedContainer ? <ContainerInfo /> : <OverviewInfo />}
      </div>
    </div>
  );
};

export default SideInfoBar;


