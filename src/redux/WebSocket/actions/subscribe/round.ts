import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as RoundActions } from "../../../Round";

// tick

export const tick = createSubscribeAction(
  events.round.tick,
  RoundActions.tick.type
);
