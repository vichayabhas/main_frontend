import { Socket } from "socket.io-client";
import {
  BoyZoneLadyZoneState,
  GetJob,
  Id,
  Mode,
  TriggerJob,
} from "../../../../../interface";
import { SocketReady } from "@/components/utility/setup";

export function getBoyZoneLadyZoneByMode(
  input: BoyZoneLadyZoneState,
  mode: Mode
): BoyZoneLadyZoneState {
  if (mode == "pee") {
    return input;
  }
  if (input == "ตรวจตรา") {
    return 'ปิดสมบูรณ์';
  }
  if (input == "ปิดแต่ยังเก็บของยังไม่หมด") {
    return "ปิดสมบูรณ์";
  }
  return input;
}
export function getFillTimeRegisterId(
  inputs: GetJob[],
  campMemberCardId: Id
): GetJob[] {
  return inputs.map(
    ({
      _id,
      name,
      passFemales,
      passMales,
      failFemales,
      failMales,
      female,
      male,
      sum,
      timeRegisters,
      reqType,
    }) => {
      let timeRegisterId: Id | null = null;
      let i = 0;
      while (i < timeRegisters.length) {
        const timeRegister = timeRegisters[i++];
        if (
          timeRegister.campMemberCardId.toString() ==
          campMemberCardId.toString()
        ) {
          timeRegisterId = timeRegister._id;
          break;
        }
      }
      return {
        _id,
        name,
        passFemales,
        passMales,
        failFemales,
        failMales,
        female,
        male,
        sum,
        timeRegisterId,
        timeRegisters,
        reqType,
      };
    }
  );
}
export function triggerJob(input: TriggerJob, socket: Socket) {
  const socketReady = new SocketReady<GetJob[]>(
    socket,
    input.event,
    input.roomId
  );
  socketReady.trigger(input.jobs);
}
export class RealTimeBaanJob {
  private socket: SocketReady<GetJob[]>;
  constructor(roomId: Id, socket: Socket) {
    this.socket = new SocketReady<GetJob[]>(socket, "updateBaanJob", roomId);
  }
  public listen(set: React.Dispatch<GetJob[]>) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export class RealTimePartJob {
  private socket: SocketReady<GetJob[]>;
  constructor(roomId: Id, socket: Socket) {
    this.socket = new SocketReady<GetJob[]>(socket, "updatePartJob", roomId);
  }
  public listen(set: React.Dispatch<GetJob[]>) {
    this.socket.listen(set);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
