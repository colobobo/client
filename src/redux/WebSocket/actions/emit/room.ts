import { createEmitAction, EmitAction } from "../actionCreators";

import { EventsRoom, PayloadsRoom } from "fast-not-fat";

export const create: EmitAction<PayloadsRoom.Create> = createEmitAction(
  EventsRoom.create
);

export const join: EmitAction<PayloadsRoom.Join> = createEmitAction(
  EventsRoom.join
);
