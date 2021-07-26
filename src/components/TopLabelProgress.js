import React, { memo } from "react";
import { Progress, Grid } from "semantic-ui-react";

export default memo(({ title, label, value, total }) => {
  return (
    <>
      <div>
        <Grid>
          <Grid.Column floated='left' width={8}>{title}</Grid.Column>
          <Grid.Column floated='right' width={8} textAlign='right'>{label}</Grid.Column>
        </Grid>
        <Progress
          value={value}
          total={total}
          className='reverse-indicating'
          size='tiny'
        >
        </Progress>
      </div>
    </>
  );
});