import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const playerReady: EmitAction<payloads.transition.PlayerReady> = createEmitAction(
  events.transition.playerReady
);

export const ended: EmitAction<payloads.transition.Ended> = createEmitAction(
  events.transition.ended
);

export const next: EmitAction = createEmitAction(events.transition.next);
