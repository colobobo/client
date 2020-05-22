import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as AreaActions } from "../../../Area";

// update

export const update = createSubscribeAction(
  events.area.update,
  AreaActions.update.type
);
