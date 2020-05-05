import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "fast-not-fat";

export const create: EmitAction<payloads.room.Create> = createEmitAction(
  events.room.create
);

export const join: EmitAction<payloads.room.Join> = createEmitAction(
  events.room.join
);
