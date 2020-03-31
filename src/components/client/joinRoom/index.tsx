import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../redux/store";
import { actions as RoomActions } from "../../../redux/WebSocket";

interface screenSize {
  width: number;
  height: number;
}

const JoinRoom: FC = () => {
  // states

  const [screenSize] = useState<screenSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [inputRoomId, setInputRoomId] = useState("");

  // store
  const dispatch: AppDispatch = useDispatch();

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
        <input type="text" value={inputRoomId} onChange={handleChange} />
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

export default JoinRoom;
