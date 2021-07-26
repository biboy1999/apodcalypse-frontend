import React, { memo } from 'react';
import { Popup, Header, Grid } from 'semantic-ui-react';

const derivePrecision = (min, total) => {
  let precisionPower = 0
  let precision = 1;
  let ratio = min / total;
  while (precisionPower < 10) {
    ratio = ratio * precision;
    if (ratio > 1) {
      break;
    }
    precision = Math.pow(10, precisionPower++);
  }
  return precision;
};

const getPercent = (value, total, precision) => {
  return (precision > 0)
    ? Math.round(value * (10 * precision)) / (10 * precision)
    : Math.round(value);
};

export default memo(({ total, data, title, label }) => {
  let allZero = data.every((e) => e.value === 0);
  let autoPrecision = derivePrecision(Math.min.apply(null, data.map(e => e.value)), total)

  let bar = data.map((e, i, { length }) => {
    let percent = (e.value / total) * 100
    return (
      <Popup
        key={e.id}
        position='top center'
        value={percent}
        trigger={
          <div
            className='bar highlight'
            style={{
              backgroundColor: allZero ? 'transparent' : '#' + e.id.substring(0, 6),
              width: percent + '%',
              display: allZero && i + 1 === length ? 'block' : percent === 0 ? 'none' : 'block',
            }}>
            <div className='progress'>{getPercent(percent, total, autoPrecision) + '%'}</div>
          </div>
        }
      >
        <Popup.Content>
          <Header size='tiny'>
            {e.name}
            <Header.Subheader>
              {e.id}
            </Header.Subheader>
          </Header>
        </Popup.Content>
      </Popup>
    );
  });

  return (
    <>
      <Grid>
        <Grid.Column floated='left' width={8}>{title}</Grid.Column>
        <Grid.Column floated='right' width={8} textAlign='right'>{label}</Grid.Column>
      </Grid>
      <div
        className='ui multiple progress'
        style={{margin: '0px'}}
      >
        {bar}
      </div>
    </>
  )
});