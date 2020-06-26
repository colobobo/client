import { createEmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const create = createEmitAction<payloads.room.Create>(
  events.room.create
);

export const join = createEmitAction<payloads.room.Join>(events.room.join);
