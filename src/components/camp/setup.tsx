import { Socket } from "socket.io-client";
import {
  Id,
  InterWorkingItem,
  ShowActionPlan,
  TriggerActionPlan,
  TriggerWorkingItem,
} from "../../../interface";
import { SocketReady } from "../utility/setup";
import React from "react";

export function triggerActionPlan(input: TriggerActionPlan, socket: Socket) {
  const socketReady = new SocketReady<ShowActionPlan[]>(
    socket,
    "updateActionPlans"
  );
  socketReady.trigger(input.forCamps, input.campId.toString());
  socketReady.trigger(input.forParts, input.partId.toString());
}
export class RealTimeActionPlan {
  private room: string;
  private socket: SocketReady<ShowActionPlan[]>;
  constructor(roomId: Id, socket: Socket) {
    this.room = roomId.toString();
    this.socket = new SocketReady<ShowActionPlan[]>(
      socket,
      "updateActionPlans"
    );
  }
  public listen(set: React.Dispatch<React.SetStateAction<ShowActionPlan[]>>) {
    this.socket.listen(this.room, set);
  }
  public disconect() {
    this.socket.disconect();
  }
}
export function triggerTrackingSheet(
  input: TriggerWorkingItem,
  socket: Socket
) {
  const socketReady = new SocketReady<InterWorkingItem[]>(
    socket,
    "updateTrackingSheets"
  );
  socketReady.trigger(input.forCamps, input.campId.toString());
  socketReady.trigger(input.forParts, input.partId.toString());
}
export class RealTimeTrackingSheet {
  private room: string;
  private socket: SocketReady<InterWorkingItem[]>;
  constructor(roomId: Id, socket: Socket) {
    this.room = roomId.toString();
    this.socket = new SocketReady<InterWorkingItem[]>(
      socket,
      "updateTrackingSheets"
    );
  }
  public listen(set: (event: InterWorkingItem[]) => void) {
    this.socket.listen(this.room, set);
  }
  public disconect() {
    this.socket.disconect();
  }
}
