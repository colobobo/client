import { WebSocketAction } from "../socketMiddleware";
import { Events } from "fast-not-fat";

export enum WebSocketActionTypes {
  wsEmit = "ws/emit",
  wsSubscribe = "ws/subscribe",
  wsUnsubscribe = "ws/unsubscribe"
}

export type EmitAction<T = {}> = (payload?: T) => WebSocketAction;

// Emit

export const createEmitAction = (event: Events): EmitAction => {
  return payload => ({
    type: WebSocketActionTypes.wsEmit,
    event,
    payload
  });
};

// Subscribe

export const createSubscribeAction = (
  event: Events,
  handle: string | (() => any)
): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsSubscribe,
    event,
    handle
  };
};

// Unsubscribe

export const createUnsubscribeAction = (event: Events): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsUnsubscribe,
    event
  };
};
