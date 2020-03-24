import { createEmitAction } from "../../actionCreators";
import { EventsExample, EventsRoom } from "fast-not-fat";
import { EmitAction } from "../../actionCreators";

const example: EmitAction<{ text: string; num: number }> = createEmitAction(
  EventsExample.SOCKET_EVENT_EXAMPLE
);

const roomCreate: EmitAction = createEmitAction(EventsRoom.create);

export default {
  example,
  roomCreate
};
