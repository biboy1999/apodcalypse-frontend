import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import StackedProgress from "./StackedProgress";

const UsageCard = ({ data, title, labelSuffix, total }) => {
  const sum = data.reduce((acc, b) => acc + b.value, 0).toFixed(2);
  return (
    <>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <span>{title}</span>
              <span className="right floated">{sum + labelSuffix}</span>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <StackedProgress total={total} data={data} />
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

UsageCard.propTypes = {
  title: PropTypes.string.isRequired,
  labelSuffix: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default UsageCard;
