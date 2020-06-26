import { createEmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const playerReady = createEmitAction<payloads.round.PlayerReady>(
  events.round.playerReady
);

export const statusUpdate = createEmitAction<payloads.round.StatusUpdate>(
  events.round.statusUpdate
);

export const memberSpawned = createEmitAction<payloads.round.MemberSpawned>(
  events.round.memberSpawned
);

export const memberDragStart = createEmitAction<payloads.round.MemberDragStart>(
  events.round.memberDragStart
);

export const memberDragEnd = createEmitAction<payloads.round.MemberDragEnd>(
  events.round.memberDragEnd
);

export const memberMove = createEmitAction<payloads.round.MemberMove>(
  events.round.memberMove
);

export const memberTrapped = createEmitAction<payloads.round.MemberTrapped>(
  events.round.memberTrapped
);

export const memberDropped = createEmitAction<payloads.round.MemberDropped>(
  events.round.memberDropped
);

export const memberArrived = createEmitAction<payloads.round.MemberArrived>(
  events.round.memberArrived
);

export const memberUpdateManager = createEmitAction<
  payloads.round.MemberUpdateManager
>(events.round.memberUpdateManager);
