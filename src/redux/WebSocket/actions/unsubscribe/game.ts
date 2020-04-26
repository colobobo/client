import { createUnsubscribeAction } from "../actionCreators";

import { EventsGame } from "fast-not-fat";

// start

export const startSuccess = createUnsubscribeAction(EventsGame.startSuccess);

export const startError = createUnsubscribeAction(EventsGame.startError);
