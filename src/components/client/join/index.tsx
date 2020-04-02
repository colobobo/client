import React, { FC, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { actions as RoomActions } from "../../../redux/WebSocket";
import { selectors as RoomSelectors } from "../../../redux/Room";
import { selectors as AdminSelectors } from "../../../redux/Admin";

import "./index.scss";

interface screenSize {
  width: number;
  height: number;
}

const Join: FC = () => {
  // states

  const [screenSize, setScreenSize] = useState<screenSize>({
    width: 0,
    height: 0
  });

  const [inputRoomId, setInputRoomId] = useState("");

  // store
  const dispatch = useDispatch();
  const roomId = useSelector(RoomSelectors.selectId);
  const roomError = useSelector(RoomSelectors.selectCode);
  const adminStatus = useSelector(AdminSelectors.selectStatus);

  const history = useHistory();

  // handlers
  const handleOnClickStart = useCallback(
    event => {
      event.preventDefault();
      dispatch(
        RoomActions.emit.room.join({
          height: screenSize.height,
          width: screenSize.width,
          id: inputRoomId
        })
      );
    },
    [dispatch, inputRoomId, screenSize.height, screenSize.width]
  );

  const handleChange = useCallback(event => {
    setInputRoomId(event.target.value);
  }, []);

  useEffect(() => {
    if (roomId) {
      history.push("/game");
    }
  }, [history, roomId]);

  useEffect(() => {
    console.log(adminStatus);
    if (adminStatus) {
      setScreenSize({
        width: 100,
        height: 100
      });
    } else {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, [adminStatus]);

  // return

  return (
    <div className="join">
      <div className="join__container">
        <form onSubmit={handleOnClickStart} className="join__form">
          <label className="form__label" htmlFor="roomId">
            Numéro de la partie
          </label>
          <input
            type="text"
            value={inputRoomId}
            onChange={handleChange}
            className="form__input"
            name="roomId"
            id="roomId"
          />
          <button
            type="submit"
            onClick={handleOnClickStart}
            className="form__action button button--orange"
          >
            Rejoindre
          </button>
        </form>
        <div className="join__error">{roomError}</div>
      </div>
    </div>
  );
};

export default Join;
