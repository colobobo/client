import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { actions as RoomActions } from "../../../redux/WebSocket";

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
      <form onSubmit={handleOnClickStart}>
        <input
          type="text"
          value={inputRoomId}
          onChange={handleChange}
          placeholder="Numéro de la room"
        />
        <button
          type="submit"
          onClick={handleOnClickStart}
          className="join__action"
        >
          Rejoindre
        </button>
      </form>
    </div>
  );
};

export default Join;
