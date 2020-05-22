import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const start: EmitAction = createEmitAction(events.game.start);

export const positionUpdate: EmitAction<payloads.game.PositionUpdate> = createEmitAction(
  events.game.positionUpdate
);
