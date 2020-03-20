import io from "socket.io-client";
import { MiddlewareAPI, Dispatch, Action } from "redux";

export interface CustomAction extends Action {
  event?: string;
  leave?: boolean;
  emit?: boolean;
  handle: ((result: any) => any) | string;
  payload: any;
}

export type MiddlewareFunction = (
  store: MiddlewareAPI
) => (next: Dispatch) => (action: CustomAction) => any;

const logStyles =
  "font-size:14px; color:white; padding:10px; border: 2px solid purple; background:black";

const socketMiddleware = (): MiddlewareFunction => {
  console.log("%c socketMiddleware : creation", logStyles);
  const url = process.env.REACT_APP_SERVER_URL as string;
  const socket = io(url);

  const middleware: MiddlewareFunction = ({ dispatch }) => next => action => {
    if (typeof action === "function") {
      return next(action);
    }

    const { event, leave, emit, handle, payload } = action;

    // if event no event -> next

    if (!event) {
      return next(action);
    }

    // emit

    if (emit) {
      console.log("%c socketMiddleware : emit ", logStyles, { event, payload });
      socket.emit(event, payload);
      return;
    }

    // subscribe

    if (handle) {
      let handleEvent = handle;
      if (typeof handleEvent === "string") {
        handleEvent = result => {
          dispatch({ type: handle, payload: result });
        };
      }
      console.log("%c socketMiddleware : subscribe", logStyles, {
        event,
        handleEvent
      });
      return socket.on(event, handleEvent);
    }

    // unsubscribe

    if (leave) {
      console.log("%c socketMiddleware : unsubscribe", logStyles, { event });
      socket.removeListener(event);
      return;
    }

    return next(action);
  };

  return middleware;
};

export default socketMiddleware; //@ts-ignore
