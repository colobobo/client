import { createSubscribeAction } from "../actionCreators";
// @ts-ignore
import { EventsRoom } from "@types/fast-not-fat";
import { actions as RoomActions } from "../../../Room";

// create

export const createSuccess = createSubscribeAction(
  EventsRoom.createSuccess,
  RoomActions.createSuccess.type
);

export const createError = createSubscribeAction(
  EventsRoom.createError,
  RoomActions.createError.type
);

// join

export const joinSuccess = createSubscribeAction(
  EventsRoom.joinSuccess,
  RoomActions.joinSuccess.type
);

export const joinError = createSubscribeAction(
  EventsRoom.joinError,
  RoomActions.joinError.type
);
