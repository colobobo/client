import React, { FC, useCallback } from "react";

// store
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

// components
import Area from "../Area";

// style
import "./index.scss";

export enum Type {
  preamble = "preamble",
  ending = "ending"
}

interface Props {
  type: Type;
}

const MotionShared: FC<Props> = ({ type }) => {
  const dispatch = useDispatch();

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.ended());
  }, [dispatch]);

  // return

  return (
    <div className="motion-shared">
      <div className="motion-shared__container">
        <Area height="min">
          <video
            className="motion-shared__video"
            autoPlay
            muted
            onEnded={handleOnVideoEnded}
          >
            <source src={require(`../../assets/motions/${type}.mp4`)} />
          </video>
        </Area>
      </div>
    </div>
  );
};

export default MotionShared;
