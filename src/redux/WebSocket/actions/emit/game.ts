import { createEmitAction, EmitAction } from "../actionCreators";

import { events } from "fast-not-fat";

export const start: EmitAction = createEmitAction(events.game.start);
