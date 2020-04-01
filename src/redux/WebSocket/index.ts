import {
  createEmitAction,
  createSubscribeAction,
  createUnsubscribeAction
} from "./actionCreators";
import { actions as CounterActions } from "../Counter";

// EXAMPLE OF ACTIONS

interface DeviceInfoPayload {
  width: number;
  height: number;
}

interface RoomJoinPayload {
  id: string;
  deviceInfo: DeviceInfoPayload;
}

export enum WebSocketEvents {
  ROOM_CREATE = "room:create",
  ROOM_JOIN = "room:join",
  SOCKET_EVENT_EXAMPLE = "test"
}

// Emit
const RoomCreate = (payload: DeviceInfoPayload) =>
  createEmitAction(WebSocketEvents.ROOM_CREATE, payload);

const RoomJoin = (payload: RoomJoinPayload) =>
  createEmitAction(WebSocketEvents.ROOM_JOIN, payload);

// emit Events.SOCKET_EVENT_EXAMPLE event with data
const wsEmitActionExample = (payload: { text: string; num: number }) =>
  createEmitAction(WebSocketEvents.SOCKET_EVENT_EXAMPLE, payload);

// Subsribe
// subscribe to Events.SOCKET_EVENT_EXAMPLE and dispatch CounterActions.increment when event is received
const wsSubscribeActionExample = createSubscribeAction(
  WebSocketEvents.SOCKET_EVENT_EXAMPLE,
  CounterActions.incrementByAmount.type
);

// Unsubsribe
// unsubscribe from Events.SOCKET_EVENT_EXAMPLE
const wsUnsubscribeMyActionExample = createUnsubscribeAction(
  WebSocketEvents.SOCKET_EVENT_EXAMPLE
);

const emit = {
  RoomCreate,
  RoomJoin
};

export const actions = {
  wsEmitActionExample,
  wsSubscribeActionExample,
  wsUnsubscribeMyActionExample,
  emit
};
