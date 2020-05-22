import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as GameActions } from "../../../Game";

// start

export const startSuccess = createSubscribeAction(
  events.game.startSuccess,
  GameActions.startSuccess.type
);

export const startError = createSubscribeAction(
  events.game.startError,
  GameActions.startError.type
);

// tick

export const tick = createSubscribeAction(
  events.game.tick,
  GameActions.tick.type
);
