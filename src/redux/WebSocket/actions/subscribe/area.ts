import { createSubscribeAction } from "../actionCreators";
import { events } from "fast-not-fat";
import { actions as AreaActions } from "../../../Area";

// update

export const update = createSubscribeAction(
  events.area.update,
  AreaActions.update.type
);
