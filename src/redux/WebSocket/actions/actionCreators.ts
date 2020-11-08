import { WebSocketAction } from "../socketMiddleware";
import { events } from "@colobobo/library";

export enum WebSocketActionTypes {
  wsEmit = "ws/emit",
  wsSubscribe = "ws/subscribe",
  wsUnsubscribe = "ws/unsubscribe"
}

export type EmitAction<T = {}> = (payload?: T) => WebSocketAction;

// Emit

export const createEmitAction = <T>(event: events.All): EmitAction<T> => {
  return payload => ({
    type: WebSocketActionTypes.wsEmit,
    event,
    payload
  });
};

// Subscribe

export const createSubscribeAction = (
  event: events.All,
  handle: string | (() => any)
): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsSubscribe,
    event,
    handle
  };
};

// Unsubscribe

export const createUnsubscribeAction = (event: events.All): WebSocketAction => {
  return {
    type: WebSocketActionTypes.wsUnsubscribe,
    event
  };
};
