import { SocketReady } from "@/components/utility/setup";
import { GetMeals, Id, TriggerCampMemberCard } from "../../../../interface";
import { Socket } from "socket.io-client";

export function triggerMeals(
  inputs: TriggerCampMemberCard[],
  socketIn: Socket
) {
  const socket = new SocketReady<TriggerCampMemberCard>(
    socketIn,
    "triggerMeals"
  );
  for (const input of inputs) {
    socket.trigger(input, input.campMemberCardId.toString());
  }
}
export class RealTimeFoodUpdate {
  private room: string;
  private socket: SocketReady<TriggerCampMemberCard>;
  constructor(campMemberCardId: Id, socket: Socket) {
    this.room = campMemberCardId.toString();
    this.socket = new SocketReady<TriggerCampMemberCard>(
      socket,
      "triggerMeals"
    );
  }
  public listen(event: (data: GetMeals[]) => void) {
    this.socket.listen(this.room, (data) => {
      event(data.meals);
    });
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
