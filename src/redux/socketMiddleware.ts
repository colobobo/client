import io from "socket.io-client";
import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";

type handleFunctionType = (p: any) => any;

interface CustomAction extends Action {
  event?: string;
  leave?: boolean;
  emit?: boolean;
  handle: handleFunctionType | string;
  payload: any;
}

const logStyles =
  "font-size:14px; color:white; padding:10px; border: 2px solid purple; background:black";

const socketMiddleware = () => {
  console.log("%c socketMiddleware : creation", logStyles);
  const url = process.env.REACT_APP_SERVER_URL as string;
  const socket = io(url);

  const middleware: Middleware = ({ dispatch }: MiddlewareAPI) => (
    next: Dispatch
  ) => (action: CustomAction) => {
    if (typeof action === "function") {
      return next(action);
    }

    const { event, leave, emit, handle, payload, ...rest } = action;

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
        handleEvent = (result: any) =>
          dispatch({ type: handle, result, ...rest });
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
