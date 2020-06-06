import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as GameActions } from "../../../Game";

export const startSuccess = createSubscribeAction(
  events.game.startSuccess,
  GameActions.startSuccess.type
);

export const startError = createSubscribeAction(
  events.game.startError,
  GameActions.startError.type
);

export const dispositionValidated = createSubscribeAction(
  events.game.dispositionValidated,
  GameActions.dispositionValidated.type
);

export const sceneTypeUpdate = createSubscribeAction(
  events.game.sceneTypeUpdate,
  GameActions.sceneTypeUpdate.type
);
