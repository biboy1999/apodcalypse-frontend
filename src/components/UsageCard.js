import { Card } from 'semantic-ui-react';
import StackedProgress from './StackedProgress';


const UsageCard = ({data, title, labelSuffix, total}) => {
  let sum = data.reduce((acc,b) => acc + b.value, 0);
  return (
    <>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <span>{title}</span>
              <span className='right floated'>{sum + labelSuffix}</span>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <StackedProgress
              total={total}
              data={data}
            >
            </StackedProgress>
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default UsageCard;


