import { memo } from "react";
import { Popup, Header, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

// this is trash
// const derivePrecision = (min, total) => {
//   let precisionPower = 0;
//   let precision = 1;
//   let ratio = min / total;
//   while (precisionPower < 10) {
//     ratio *= precision;
//     if (ratio > 1) {
//       break;
//     }
//     precision = (precisionPower++) ** 10;
//   }
//   return precision;
// };

const getPercent = (value, total, precision) =>
  precision > 0
    ? Math.round(value * (10 * precision)) / (10 * precision)
    : Math.round(value);

const StackedProgress = memo(({ total, data }) => {
  const allZero = data.every((e) => e.value === 0);
  // const autoPrecision = derivePrecision(
  //   Math.min.apply(
  //     null,
  //     data.map((e) => e.value),
  //   ),
  //   total,
  // );

  const bar = data.map((e, i, { length }) => {
    const percent = (e.value / total) * 100;
    return (
      <Popup
        key={e.id}
        position="top center"
        value={percent}
        trigger={
          <div
            className="bar highlight"
            style={{
              backgroundColor: allZero
                ? "transparent"
                : `#${e.id.substring(0, 6)}`,
              width: `${percent}%`,
              display:
                allZero && i + 1 === length
                  ? "block"
                  : percent === 0
                  ? "none"
                  : "block",
              minWidth: "5px",
            }}
          >
            <div className="progress">
              {`${getPercent(percent, total, 2)}%`}
            </div>
          </div>
        }
      >
        <Popup.Content>
          <Header size="tiny">
            {e.name}
            <Header.Subheader>{e.id}</Header.Subheader>
          </Header>
        </Popup.Content>
      </Popup>
    );
  });

  return (
    <>
      <div className="ui multiple progress" style={{ margin: "0px" }}>
        {bar}
      </div>
    </>
  );
});

StackedProgress.propTypes = {
  total: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StackedProgress;
