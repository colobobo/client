import { Events } from "./events";
import {
  createEmitAction,
  createSubscribeAction,
  createUnsubscribeAction
} from "./actionCreators";
import { actions as CounterActions } from "../Counter";

// EXAMPLE OF ACTIONS

// Emit
// emit Events.SOCKET_EVENT_EXAMPLE event with data
const wsEmitActionExample = (data: { text: string; num: number }) =>
  createEmitAction(Events.SOCKET_EVENT_EXAMPLE, data);

// Subsribe
// subscribe to Events.SOCKET_EVENT_EXAMPLE and dispatch CounterActions.increment when event is received
const wsSubscribeActionExample = createSubscribeAction(
  Events.SOCKET_EVENT_EXAMPLE,
  CounterActions.incrementByAmount.type
);

// Unsubsribe
// unsubscribe from Events.SOCKET_EVENT_EXAMPLE
const wsUnsubscribeMyActionExample = createUnsubscribeAction(
  Events.SOCKET_EVENT_EXAMPLE
);

export const actions = {
  wsEmitActionExample,
  wsSubscribeActionExample,
  wsUnsubscribeMyActionExample
};
