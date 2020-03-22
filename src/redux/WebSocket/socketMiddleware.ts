import io from "socket.io-client";
import { MiddlewareAPI, Dispatch, Action } from "redux";
import { WebSocketEvents } from "./events";
import { WebSocketActionTypes } from "./actionCreators";

export interface WebSocketAction extends Action {
  type: WebSocketActionTypes;
  event: WebSocketEvents;
  handle?: ((result: any) => any) | string;
  payload?: any;
}

export type MiddlewareFunction = (
  store: MiddlewareAPI
) => (next: Dispatch) => (action: WebSocketAction) => any;

const socketMiddleware = (): MiddlewareFunction => {
  const url = process.env.REACT_APP_SERVER_URL as string;
  const socket = io(url);

  const middleware: MiddlewareFunction = ({ dispatch }) => next => action => {
    // pass to next
    next(action);

    const { type, event, handle, payload } = action;

    // if no event -> do nothing

    if (!event) {
      return;
    }

    // emit

    if (type === WebSocketActionTypes.wsEmit) {
      socket.emit(event, payload);
      return;
    }

    // subscribe

    if (type === WebSocketActionTypes.wsSubscribe && handle) {
      let handleEvent = handle;
      if (typeof handleEvent === "string") {
        handleEvent = result => {
          dispatch({ type: handle, payload: result });
        };
      }
      return socket.on(event, handleEvent);
    }

    // unsubscribe

    if (type === WebSocketActionTypes.wsUnsubscribe) {
      socket.removeListener(event);
      return;
    }
  };

  return middleware;
};

export default socketMiddleware;
