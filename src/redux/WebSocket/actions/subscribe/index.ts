import { createSubscribeAction } from "../../actionCreators";
import { EventsExample, EventsRoom } from "fast-not-fat";
import { actions as RoomActions } from "../../../Room";
import { actions as CounterActions } from "../../../Counter";

const example = createSubscribeAction(
  EventsExample.SOCKET_EVENT_EXAMPLE,
  CounterActions.incrementByAmount.type
);

export const roomCreateSuccess = createSubscribeAction(
  EventsRoom.createSuccess,
  RoomActions.createSuccess.type
);

export default {
  example,
  roomCreateSuccess
};
