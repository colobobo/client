import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../redux/store";
import { actions as RoomActions } from "../../../redux/WebSocket";

const Landing: FC = () => {
  // store

  const dispatch: AppDispatch = useDispatch();

  // handlers

  const handleOnClickCreateRoom = useCallback(() => {
    dispatch(
      RoomActions.emit.room.create({
        width: window.innerWidth,
        height: window.innerHeight
      })
    );
  }, [dispatch]);

  const handleOnClickJoinRoom = useCallback(() => {
    console.log("join room");
  }, []);

  // return

  return (
    <div className="landing">
      <button onClick={handleOnClickCreateRoom} className="landing__action">
        Créer une partie
      </button>
      <button onClick={handleOnClickJoinRoom} className="landing__action">
        Rejoindre une partie
      </button>
    </div>
  );
};

export default Landing;
