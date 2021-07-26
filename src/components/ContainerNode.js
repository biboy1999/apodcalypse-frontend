import React, { memo } from 'react';
import { Header, Label, Grid } from 'semantic-ui-react';
import TopLabelProgress from './TopLabelProgress';
import LabelNodeHandle from './LabelNodeHandle';

export default memo(({ data }) => {
  return (
    <>
      <Header as='h5' style={{wordBreak: 'break-all'}}>
        {data.name}
        {data.healthyStatus !== 'none' &&
          <Label color={data.healthyStatus === 'healthy' ? 'green' : data.healthyStatus === 'starting' ? 'yellow' : 'red'} size='mini' horizontal>{data.healthyStatus}</Label>
        }
        <Header.Subheader>
          {`#${data.id}`}
        </Header.Subheader>
      </Header>

      <TopLabelProgress
        title="CPU"
        label={`${data.cpu}%`}
        value={data.cpu}
        total={100}
      />

      <TopLabelProgress
        title="Memory"
        label={`${data.memory}/${data.totalMemory} MiB`}
        value={data.memory}
        total={data.totalMemory}
      />

      <Grid>
        <Grid.Column floated='left' width={8}>Processes:</Grid.Column>
        <Grid.Column floated='right' width={8} textAlign='right'>{data.processCount}</Grid.Column>
      </Grid>

      <LabelNodeHandle
        type='source'
        position='bottom'
        id='8080'
      />

      <Label
        attached='top right'
        size='tiny'
        color='green'
      >{data.status}</Label>
    </>
  );
});