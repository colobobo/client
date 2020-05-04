import { createSubscribeAction } from "../actionCreators";
import { EventsGame } from "fast-not-fat";
import { actions as GameActions } from "../../../Game";

// start

export const startSuccess = createSubscribeAction(
  EventsGame.startSuccess,
  GameActions.startSuccess.type
);

export const startError = createSubscribeAction(
  EventsGame.startError,
  GameActions.startError.type
);

// tick

export const tick = createSubscribeAction(
  EventsGame.tick,
  GameActions.tick.type
);
