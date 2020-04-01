import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { actions as RoomActions } from "../../../redux/WebSocket";

import "./index.scss";

interface screenSize {
  width: number;
  height: number;
}

const Join: FC = () => {
  // states

  const [screenSize] = useState<screenSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [inputRoomId, setInputRoomId] = useState("");

  // store
  const dispatch = useDispatch();

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
      </div>
    </div>
  );
};

export default Join;
