import { Icon, Label, Tab, Table } from 'semantic-ui-react';
import UsageCard from '../../UsageCard';
import OverviewPanel from './Panel/OverviewPanel';
import { testImagesList } from '../../../temp/initial-elements';

const panes = [
  {
    menuItem: 'Overview',
    render: () => <OverviewPanel />
  },
  {
    menuItem: 'Containers',
    render: () =>
    (
      <>
        <Table
          fixed
          compact='very'
          basic='very'
          selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell width='1'></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><Label color='red'>Stopped</Label></Table.Cell>
              <Table.Cell className='warp-text'>frontend suck</Table.Cell>
              <Table.Cell>fffffff001</Table.Cell>
              <Table.Cell>not_vue</Table.Cell>
              <Table.Cell><Icon name='arrow right' /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Label color='green'>Running</Label></Table.Cell>
              <Table.Cell className='warp-text'>idk</Table.Cell>
              <Table.Cell>fffffff002</Table.Cell>
              <Table.Cell>qwe</Table.Cell>
              <Table.Cell><Icon name='arrow right' /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Label color='yellow'>Starting</Label></Table.Cell>
              <Table.Cell className='warp-text'>asdf</Table.Cell>
              <Table.Cell>fffffff003</Table.Cell>
              <Table.Cell>test/asd</Table.Cell>
              <Table.Cell><Icon name='arrow right' /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    )
  },
  {
    menuItem: 'Images',
    render: () =>
    (
      <>
        <div
          style={{ flex: '1 1 auto', overflowY: 'scroll', height: '1px' }}
        >
          <Table fixed compact='very' basic='very' selectable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Tags</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell width='1'></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {testImagesList.map((e) => {
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{e.id}</Table.Cell>
                      <Table.Cell className='warp-text'>{e.repo + ':' + e.tag}</Table.Cell>
                      <Table.Cell>{e.size}</Table.Cell>
                      <Table.Cell>{e.created}</Table.Cell>
                      <Table.Cell><Icon name='arrow right' /></Table.Cell>
                    </Table.Row>
                  </>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      </>
    )
  },
  {
    menuItem: 'Networks',
    render: () => 'WIP'
  },
  {
    menuItem: 'System Info',
    render: () => 'WIP'
  },
]


const OverviewInfo = () => {
  return (
    <div className="infosidebar">
      <UsageCard
        total={100}
        title='CPU Usage'
        labelSuffix='%'
        data={[
          { id: '4c01db0b339c', name: 'frondend suck', value: 30 },
          { id: 'd7886598dbe2', name: 'test', value: 17 },
          { id: 'e90b8831a4b8', name: 'why', value: 31 },
        ]}
      />
      <UsageCard
        total={8192}
        title='Memory Usage'
        labelSuffix=' MiB / 8192 MiB'
        data={[
          { id: '4c01db0b339c', name: 'frondend suck', value: 1024 },
          { id: 'd7886598dbe2', name: 'test', value: 4096 },
          { id: 'e90b8831a4b8', name: 'why', value: 254 },
          { id: '0a058871a4b8', name: 'why', value: 254 },
        ]}
      />
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}
      />
    </div>
  );
};

export default OverviewInfo;


