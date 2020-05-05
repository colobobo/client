import { createSubscribeAction } from "../actionCreators";
import { events } from "fast-not-fat";
import { actions as RoomActions } from "../../../Room";

// create

export const createSuccess = createSubscribeAction(
  events.room.createSuccess,
  RoomActions.createSuccess.type
);

export const createError = createSubscribeAction(
  events.room.createError,
  RoomActions.createError.type
);

// join

export const joinSuccess = createSubscribeAction(
  events.room.joinSuccess,
  RoomActions.joinSuccess.type
);

export const joinError = createSubscribeAction(
  events.room.joinError,
  RoomActions.joinError.type
);
