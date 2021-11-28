/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Icon } from "semantic-ui-react";
import {
  containerListState,
  containerNetworkListState,
  containerStatsListState,
  imagesListState,
} from "../recoil/Container";

const StatusNag = () => {
  const containerList = useRecoilValue(containerListState);
  const containerStatsList = useRecoilValue(containerStatsListState);
  const containerNetworkList = useRecoilValue(containerNetworkListState);
  const imagesList = useRecoilValue(imagesListState);

  const [visable, setVisable] = useState(true);
  const [conatinerStatus, setConatinerStatus] = useState(false);
  const [statsStatus, setStatsStatus] = useState(false);
  const [netowrkStatus, setNetowrkStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);

  const handleClose = () => setVisable(false);

  useEffect(() => {
    if (containerList.length !== 0) setConatinerStatus(true);
  }, [containerList]);

  useEffect(() => {
    if (Object.keys(containerStatsList).length !== 0) setStatsStatus(true);
  }, [containerStatsList]);

  useEffect(() => {
    if (containerNetworkList.length !== 0) setNetowrkStatus(true);
  }, [containerNetworkList]);

  useEffect(() => {
    if (imagesList.length !== 0) setImageStatus(true);
  }, [imagesList]);

  useEffect(() => {
    if (conatinerStatus && statsStatus && netowrkStatus && imageStatus)
      setVisable(false);
  }, [conatinerStatus, statsStatus, netowrkStatus, imageStatus]);

  return (
    <>
      {visable && (
        <div className="ui status overlay nag">
          <div className="title">
            {conatinerStatus ? (
              <Icon name="check" color="green" />
            ) : (
              <Icon name="x" color="red" />
            )}
            <span>Container List </span>
            {statsStatus ? (
              <Icon name="check" color="green" />
            ) : (
              <Icon name="x" color="red" />
            )}
            <span>Stats List </span>
            {netowrkStatus ? (
              <Icon name="check" color="green" />
            ) : (
              <Icon name="x" color="red" />
            )}
            <span>Network List </span>
            {imageStatus ? (
              <Icon name="check" color="green" />
            ) : (
              <Icon name="x" color="red" />
            )}
            <span>Image List </span>
          </div>
          <Icon name="close" onClick={handleClose} />
        </div>
      )}
    </>
  );
};

// StatusNag.propTypes = {};

export default StatusNag;
