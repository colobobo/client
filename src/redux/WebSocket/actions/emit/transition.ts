import { createEmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const playerReady = createEmitAction<payloads.transition.PlayerReady>(
  events.transition.playerReady
);

export const ended = createEmitAction<payloads.transition.Ended>(
  events.transition.ended
);

export const next = createEmitAction(events.transition.next);
