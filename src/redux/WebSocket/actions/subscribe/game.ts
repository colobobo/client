import { createSubscribeAction } from "../actionCreators";
import { EventsGame } from "fast-not-fat";
import { actions as GameActions } from "../../../Room";

// start

export const startSuccess = createSubscribeAction(
  EventsGame.startSuccess,
  GameActions.createSuccess.type
);

export const startError = createSubscribeAction(
  EventsGame.startError,
  GameActions.createError.type
);
