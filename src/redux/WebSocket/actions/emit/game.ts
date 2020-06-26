import { createEmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const start = createEmitAction(events.game.start);

export const dispositionSelected = createEmitAction<
  payloads.game.DispositionSelected
>(events.game.dispositionSelected);
