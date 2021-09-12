import { memo } from "react";
import { Progress, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

const TopLabelProgress = memo(({ title, label, value, total }) => (
  <>
    <div>
      <Grid>
        <Grid.Column floated="left" width={8}>
          {title}
        </Grid.Column>
        <Grid.Column floated="right" width={8} textAlign="right">
          {label}
        </Grid.Column>
      </Grid>
      <Progress
        value={value}
        total={total}
        className="reverse-indicating"
        size="tiny"
      />
    </div>
  </>
));

TopLabelProgress.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default TopLabelProgress;
