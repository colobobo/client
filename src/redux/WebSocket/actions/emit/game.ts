import { createEmitAction, EmitAction } from "../actionCreators";

import { events } from "@colobobo/library";

export const start: EmitAction = createEmitAction(events.game.start);
