import { SocketReady } from "@/components/utility/setup";
import { GetMeals, Id, TriggerCampMemberCard } from "../../../../interface";
import { Socket } from "socket.io-client";

export function triggerMeals(
  inputs: TriggerCampMemberCard[],
  socketIn: Socket
) {
  for (const input of inputs) {
    const socket = new SocketReady<TriggerCampMemberCard>(
      socketIn,
      "triggerMeals",
      input.campMemberCardId
    );
    socket.trigger(input);
  }
}
export class RealTimeFoodUpdate {
  private socket: SocketReady<TriggerCampMemberCard>;
  constructor(campMemberCardId: Id, socket: Socket) {
    this.socket = new SocketReady<TriggerCampMemberCard>(
      socket,
      "triggerMeals",
      campMemberCardId
    );
  }
  public listen(event: (data: GetMeals[]) => void) {
    this.socket.listen((data) => {
      event(data.meals);
    });
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
