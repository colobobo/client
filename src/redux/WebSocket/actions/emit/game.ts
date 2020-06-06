import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const start: EmitAction = createEmitAction(events.game.start);

export const dispositionSelected: EmitAction<payloads.game.DispositionSelected> = createEmitAction(
  events.game.dispositionSelected
);
