import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

import { actions as RoomActions } from "../../../redux/WebSocket";
import { selectors as RoomSelectors } from "../../../redux/Room";

import "./index.scss";

const Landing: FC = () => {
  // store

  const dispatch = useDispatch();
  const roomId = useSelector(RoomSelectors.selectId);
  const roomError = useSelector(RoomSelectors.selectError);

  const history = useHistory();

  // handlers

  const handleOnClickCreateRoom = useCallback(() => {
    dispatch(
      RoomActions.emit.room.create({
        width: window.innerWidth,
        height: window.innerHeight
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (roomId) {
      history.push(roomId);
    }
  });

  // return

  return (
    <div className="landing">
      <div className="landing__container">
        <div className="landing__actions">
          <button
            onClick={handleOnClickCreateRoom}
            className="landing__action button button--orange"
          >
            Créer une partie
          </button>
          <Link to="/join" className="landing__action button button--blue">
            Rejoindre une partie
          </Link>
        </div>
        <div className="landing__error">{roomError}</div>
      </div>
    </div>
  );
};

export default Landing;
