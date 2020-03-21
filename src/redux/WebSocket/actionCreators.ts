import { WebSocketEvents } from "./events";
import { WebSocketAction } from "./socketMiddleware";

export enum WebSocketActionTypes {
  wsEmit = "ws/emit",
  wsSubscribe = "ws/subscribe",
  wsUnsubscribe = "ws/unsubscribe"
}

// Emit

export const createEmitAction = (
  event: WebSocketEvents,
  payload: any
): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsEmit,
    event,
    payload
  };
};

// Subscribe

export const createSubscribeAction = (
  event: WebSocketEvents,
  handle: string | (() => any)
): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsSubscribe,
    event,
    handle
  };
};

// Unsubscribe

export const createUnsubscribeAction = (
  event: WebSocketEvents
): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsUnsubscribe,
    event
  };
};
