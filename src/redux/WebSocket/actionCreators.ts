import { Events } from "./events";

// Emit

export const createEmitAction = (event: Events, data: any) => {
  return {
    type: null,
    emit: true,
    event,
    payload: {
      data
    }
  };
};

// Subscribe

export const createSubscribeAction = (
  event: Events,
  handle: string | (() => any)
) => {
  return {
    type: null,
    event,
    handle
  };
};

// Unsubscribe

export const createUnsubscribeAction = (event: Events) => {
  return {
    type: null,
    leave: true,
    event
  };
};
