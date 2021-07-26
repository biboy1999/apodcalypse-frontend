import { Icon, Card } from 'semantic-ui-react';

const OverviewPanel = (props) => {
  return (
    <Card.Group centered className='horizontal'>
      <Card style={{ width: '170px', alignItems: 'center', minWidth: '0px' }}>
        <div>
          <Icon name='dice d6' size='huge' />
        </div>
        <Card.Content>
          <Card.Header>10</Card.Header>
          <Card.Description>Containers</Card.Description>
        </Card.Content>
      </Card>
      <Card style={{ width: '170px', alignItems: 'center', minWidth: '0px' }}>
        <Icon name='window restore' size='huge' />
        <Card.Content>
          <Card.Header>5</Card.Header>
          <Card.Description>Images</Card.Description>
        </Card.Content>
      </Card>
      <Card style={{ width: '170px', alignItems: 'center', minWidth: '0px' }}>
        <Icon name='sitemap' size='huge' />
        <Card.Content>
          <Card.Header>3</Card.Header>
          <Card.Description>Networks</Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default OverviewPanel;


