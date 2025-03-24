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
  public disconnect() {
    this.socket.disconnect();
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
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerOrder(input: TriggerOrder, socket: Socket) {
  const socketReadyCampMemberCard = new SocketReady<ShowOrder[]>(
    socket,
    "campMemberCardUpdateOrder"
  );
  const socketReadyFrom = new SocketReady<ShowOrder[]>(
    socket,
    `${input.types}UpdateOrder`
  );
  const socketReadyCamp = new SocketReady<ShowOrder[]>(
    socket,
    "campUpdateOrder"
  );
  socketReadyCamp.trigger(input.campOrders, input.campId.toString());
  socketReadyFrom.trigger(input.fromOrders, input.fromId.toString());
  socketReadyCampMemberCard.trigger(
    input.campMemberCardOrders,
    input.campMemberCardId.toString()
  );
  triggerItem(input.items, input.campId, socket);
}
export class RealTimeOrder {
  private room: string;
  private socket: SocketReady<ShowOrder[]>;
  constructor(
    roomId: Id,
    socket: Socket,
    types: "camp" | "campMemberCard" | "baan" | "part"
  ) {
    this.room = roomId.toString();
    this.socket = new SocketReady(socket, `${types}UpdateOrder`);
  }
  public listen(set: (event: ShowOrder[]) => void) {
    this.socket.listen(this.room, set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerItem(input: InterItem[], campId: Id, socket: Socket) {
  const socketReady = new SocketReady<InterItem[]>(socket, "updateItem");
  socketReady.trigger(input, campId.toString());
}
export class RealTimeItem {
  private room: string;
  private socket: SocketReady<InterItem[]>;
  constructor(campId: Id, socket: Socket) {
    this.room = campId.toString();
    this.socket = new SocketReady(socket, "updateItem");
  }
  public listen(set: (event: InterItem[]) => void) {
    this.socket.listen(this.room, set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
