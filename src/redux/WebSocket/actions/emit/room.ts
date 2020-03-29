import { createEmitAction, EmitAction } from "../actionCreators";
// @ts-ignore
import { EventsRoom, PayloadsRoom } from "@types/fast-not-fat";

export const create: EmitAction<PayloadsRoom.Create> = createEmitAction(
  EventsRoom.create
);

export const join: EmitAction<PayloadsRoom.Join> = createEmitAction(
  EventsRoom.join
);
