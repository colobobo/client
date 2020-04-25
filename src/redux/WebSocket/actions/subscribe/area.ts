import { createSubscribeAction } from "../actionCreators";
import { EventsArea } from "fast-not-fat";
import { actions as AreaActions } from "../../../Area";

// update

export const createSuccess = createSubscribeAction(
  EventsArea.update,
  AreaActions.update.type
);
