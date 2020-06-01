import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as RoundActions } from "../../../Round";

export const init = createSubscribeAction(
  events.round.init,
  RoundActions.init.type
);

export const start = createSubscribeAction(
  events.round.start,
  RoundActions.start.type
);

export const tick = createSubscribeAction(
  events.round.tick,
  RoundActions.tick.type
);

export const fail = createSubscribeAction(
  events.round.fail,
  RoundActions.fail.type
);

export const Success = createSubscribeAction(
  events.round.success,
  RoundActions.success.type
);
