import { createEmitAction, EmitAction } from "../actionCreators";

import { events, payloads } from "@colobobo/library";

export const memberMove: EmitAction<payloads.round.MemberMove> = createEmitAction(
  events.round.memberMove
);
