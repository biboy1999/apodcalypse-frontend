/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Icon } from "semantic-ui-react";
import {
  containerListState,
  containerNetworkListState,
  containerStatsListState,
} from "../recoil/Container";

const StatusNag = () => {
  const containerList = useRecoilValue(containerListState);
  const containerStatsList = useRecoilValue(containerStatsListState);
  const containerNetworkList = useRecoilValue(containerNetworkListState);
  const [visable, setVisable] = useState(true);
  const handleClose = () => setVisable(false);
  return (
    <>
      {visable && (
        <div className="ui status overlay nag">
          <div className="title">
            {containerList.length === 0 ? (
              <Icon name="x" color="red" />
            ) : (
              <Icon name="check" color="green" />
            )}
            <span>Container List </span>
            {Object.keys(containerStatsList).length === 0 ? (
              <Icon name="x" color="red" />
            ) : (
              <Icon name="check" color="green" />
            )}
            <span>Stats List </span>
            {containerNetworkList.length === 0 ? (
              <Icon name="x" color="red" />
            ) : (
              <Icon name="check" color="green" />
            )}
            <span>Network List </span>
          </div>
          <Icon name="close" onClick={handleClose} />
        </div>
      )}
    </>
  );
};

// StatusNag.propTypes = {};

export default StatusNag;
