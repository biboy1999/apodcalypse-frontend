/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Icon } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const SocketStatusNag = ({ visable }) => (
  <>
    {!visable && (
      <div className="ui red status overlay nag">
        <div className="title">
          <span>
            Couldn&apos;t connect to IDM (Check your connection and try again.)
          </span>
          {/* {conatinerStatus ? (
              <Icon name="check" color="green" />
            ) : (
              <Icon name="x" color="red" />
            )}
            <span>Container List </span> */}
        </div>
        {/* <Icon name="close" onClick={handleClose} /> */}
      </div>
    )}
  </>
);

// StatusNag.propTypes = {};

export default SocketStatusNag;
