import { createEmitAction, EmitAction } from "../actionCreators";

import { EventsGame } from "fast-not-fat";

export const start: EmitAction = createEmitAction(EventsGame.start);
