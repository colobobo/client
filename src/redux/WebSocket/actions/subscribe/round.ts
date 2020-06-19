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

export const statusUpdateSuccess = createSubscribeAction(
  events.round.statusUpdateSuccess,
  RoundActions.statusUpdateSuccess.type
);

export const tick = createSubscribeAction(
  events.round.tick,
  RoundActions.tick.type
);

export const end = createSubscribeAction(
  events.round.end,
  RoundActions.end.type
);
