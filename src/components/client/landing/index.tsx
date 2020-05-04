import React, { FC, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// store
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../../../redux";

// style
import "./index.scss";

const Landing: FC = () => {
  // store

  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);
  const roomError = useSelector(selectors.room.selectError);
  const screenSize = useSelector(selectors.device.selectScreenSize);

  const history = useHistory();

  // handlers

  const handleOnClickCreateRoom = useCallback(() => {
    dispatch(
      actions.webSocket.emit.room.create({
        width: screenSize.width,
        height: screenSize.height
      })
    );
  }, [dispatch, screenSize]);

  useEffect(() => {
    if (roomId) {
      history.push("/room/" + roomId);
    }
  }, [history, roomId]);

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
