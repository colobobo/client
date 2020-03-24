import { createUnsubscribeAction } from "../../actionCreators";
import { EventsExample, EventsRoom } from "fast-not-fat";

const example = createUnsubscribeAction(EventsExample.SOCKET_EVENT_EXAMPLE);

const roomCreateSuccess = createUnsubscribeAction(EventsRoom.createSuccess);

export default {
  example,
  roomCreateSuccess
};
