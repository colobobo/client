import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const playerReady: EmitAction<payloads.round.PlayerReady> = createEmitAction(
  events.round.playerReady
);

export const memberSpawned: EmitAction<payloads.round.MemberSpawned> = createEmitAction(
  events.round.memberSpawned
);

export const memberDragStart: EmitAction<payloads.round.MemberDragStart> = createEmitAction(
  events.round.memberDragStart
);

export const memberDragEnd: EmitAction<payloads.round.MemberDragEnd> = createEmitAction(
  events.round.memberDragEnd
);

export const memberMove: EmitAction<payloads.round.MemberMove> = createEmitAction(
  events.round.memberMove
);

export const memberTrapped: EmitAction<payloads.round.MemberTrapped> = createEmitAction(
  events.round.memberTrapped
);

export const memberDropped: EmitAction<payloads.round.MemberDropped> = createEmitAction(
  events.round.memberDropped
);

export const memberArrived: EmitAction<payloads.round.MemberArrived> = createEmitAction(
  events.round.memberArrived
);
