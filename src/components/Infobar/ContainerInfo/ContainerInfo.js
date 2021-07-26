import { Card, Tab, Button, Icon } from "semantic-ui-react";


const panes = () => [
  {
    menuItem: 'Status',
    render: () => 'cpu graph here'
  },
  {
    menuItem: 'Logs',
    render: () => 'log here'
  },
  {
    menuItem: 'Inspect',
    render: () => ''
  },
  {
    menuItem: 'Attach',
    render: () => test
  }
]


const ContainerInfo = () => {
  return (
    <>
      <div>
        <Card.Group>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Icon name='cogs'/> Actions
              </Card.Header>
            </Card.Content>
            <Card.Content >
              <Button.Group compact size='small' style={{margin: '0px 10px 0px 0px'}}>
                <Button positive><Icon name='play' />Start</Button>
                <Button color='yellow'><Icon name='sync' />Restart</Button>
                <Button negative><Icon name='stop' />Stop</Button>
              </Button.Group>
              <Button.Group compact size='small' style={{margin: '0px 10px 0px 0px'}}>
                <Button positive><Icon name='play' />Resume</Button>
                <Button color='yellow'><Icon name='pause' />Pause</Button>
                <Button negative><Icon name='skull crossbones' />Kill</Button>
              </Button.Group>
              <Button.Group compact size='small' style={{margin: '0px 10px 0px 0px'}}>
                <Button negative><Icon name='trash' />Remove</Button>
              </Button.Group>
            </Card.Content>
          </Card>
        </Card.Group>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes('test')}
          style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}
        />
      </div>
    </>
  );
};

export default ContainerInfo;


