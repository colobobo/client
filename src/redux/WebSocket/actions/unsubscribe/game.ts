import { createUnsubscribeAction } from "../actionCreators";

import { events } from "fast-not-fat";

// start

export const startSuccess = createUnsubscribeAction(events.game.startSuccess);

export const startError = createUnsubscribeAction(events.game.startError);
