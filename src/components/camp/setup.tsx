import { Socket } from "socket.io-client";
import {
  Id,
  InterItem,
  InterWorkingItem,
  ShowActionPlan,
  ShowOrder,
  TriggerActionPlan,
  TriggerOrder,
  TriggerWorkingItem,
} from "../../../interface";
import { SocketReady } from "../utility/setup";
import React from "react";

export function triggerActionPlan(input: TriggerActionPlan, socket: Socket) {
  new SocketReady<ShowActionPlan[]>(
    socket,
    "updateActionPlans",
    input.campId
  ).trigger(input.forCamps);
  new SocketReady<ShowActionPlan[]>(
    socket,
    "updateActionPlans",
    input.partId
  ).trigger(input.forParts);
}
export class RealTimeActionPlan {
  private socket: SocketReady<ShowActionPlan[]>;
  constructor(roomId: Id, socket: Socket) {
    this.socket = new SocketReady<ShowActionPlan[]>(
      socket,
      "updateActionPlans",
      roomId
    );
  }
  public listen(set: React.Dispatch<React.SetStateAction<ShowActionPlan[]>>) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerTrackingSheet(
  input: TriggerWorkingItem,
  socket: Socket
) {
  new SocketReady<InterWorkingItem[]>(
    socket,
    "updateTrackingSheets",
    input.campId
  ).trigger(input.forCamps);
  new SocketReady<InterWorkingItem[]>(
    socket,
    "updateTrackingSheets",
    input.partId
  ).trigger(input.forParts);
}
export class RealTimeTrackingSheet {
  private socket: SocketReady<InterWorkingItem[]>;
  constructor(roomId: Id, socket: Socket) {
    this.socket = new SocketReady<InterWorkingItem[]>(
      socket,
      "updateTrackingSheets",
      roomId
    );
  }
  public listen(set: (event: InterWorkingItem[]) => void) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerOrder(input: TriggerOrder, socket: Socket) {
  const socketReadyCampMemberCard = new SocketReady<ShowOrder[]>(
    socket,
    "campMemberCardUpdateOrder",
    input.campId
  );
  const socketReadyFrom = new SocketReady<ShowOrder[]>(
    socket,
    `${input.types}UpdateOrder`,
    input.fromId
  );
  const socketReadyCamp = new SocketReady<ShowOrder[]>(
    socket,
    "campUpdateOrder",
    input.campMemberCardId
  );
  socketReadyCamp.trigger(input.campOrders);
  socketReadyFrom.trigger(input.fromOrders);
  socketReadyCampMemberCard.trigger(input.campMemberCardOrders);
  triggerItem(input.items, input.campId, socket);
}
export class RealTimeOrder {
  private socket: SocketReady<ShowOrder[]>;
  constructor(
    roomId: Id,
    socket: Socket,
    types: "camp" | "campMemberCard" | "baan" | "part"
  ) {
    this.socket = new SocketReady(socket, `${types}UpdateOrder`, roomId);
  }
  public listen(set: (event: ShowOrder[]) => void) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerItem(input: InterItem[], campId: Id, socket: Socket) {
  const socketReady = new SocketReady<InterItem[]>(
    socket,
    "updateItem",
    campId
  );
  socketReady.trigger(input);
}
export class RealTimeItem {
  private socket: SocketReady<InterItem[]>;
  constructor(campId: Id, socket: Socket) {
    this.socket = new SocketReady(socket, "updateItem", campId);
  }
  public listen(set: (event: InterItem[]) => void) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
