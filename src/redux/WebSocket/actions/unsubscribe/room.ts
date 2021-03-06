import { createUnsubscribeAction } from "../actionCreators";

import { events } from "@colobobo/library";

// create

export const createSuccess = createUnsubscribeAction(events.room.createSuccess);

export const createError = createUnsubscribeAction(events.room.createError);

// join

export const joinSuccess = createUnsubscribeAction(events.room.joinSuccess);

export const joinError = createUnsubscribeAction(events.room.joinError);
