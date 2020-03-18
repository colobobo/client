// ACTION CREATOR

// Emit
const createEmitAction = (event: string) => {
  return (data: any) => ({
    type: null,
    emit: true,
    event,
    payload: {
      data
    }
  });
};

// Subscribe
const createSubscribeAction = (event: string, handle: string | (() => any)) => {
  return {
    type: null,
    event,
    handle
  };
};

// Unsubscribe
const createUnsubscribeAction = (event: string) => {
  return {
    type: null,
    leave: true,
    event
  };
};

// GENERIC ACTION

// Emit
export const wsEmitAction = (event: string, data: any) =>
  createEmitAction(event)(data);

// Subscribe
export const wsSubscribeAction = (
  event: string,
  handle: string | (() => any)
) => createSubscribeAction(event, handle);

// Unsubscribe
export const wsUnsubscribeAction = (event: string) =>
  createUnsubscribeAction(event);

// EXAMPLE OF ACTION CREATION

// Emit
// emit "socketEventName" event with passed data
export const wsEmitMyActionExample = createEmitAction("socketEventName");

// Subsribe
// subscribe to "socketEventName" and dispatch "reduxAction" action when event is received
export const wsSubscribeMyActionExample = createSubscribeAction(
  "socketEventName",
  "reduxAction"
);

// Unsubsribe
// unsubscribe from "socketEventName"
export const wsUnsubscribeMyActionExample = createUnsubscribeAction(
  "socketEventName"
);
