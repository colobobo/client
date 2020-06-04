import { createSubscribeAction } from "../actionCreators";
import { events } from "@colobobo/library";
import { actions as AdminActions } from "../../../Admin";

export const deviceConnected = createSubscribeAction(
  events.admin.deviceConnected,
  AdminActions.deviceConnected.type
);
