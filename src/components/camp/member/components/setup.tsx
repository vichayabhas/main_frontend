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
    return "เพศตรงข้ามออกจากโซน";
  }
  if (input == "ปิดแต่ยังเก็บของยังไม่หมด") {
    return "ปิดสมบูรณ์";
  }
  if (input == "พร้อมอาบน้ำ") {
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
  const socketReady = new SocketReady<GetJob[]>(socket, input.event);
  socketReady.trigger(input.jobs, input.roomId.toString());
}
export class RealTimeBaanJob {
  private room: string;
  private socket: SocketReady<GetJob[]>;
  constructor(roomId: Id, socket: Socket) {
    this.room = roomId.toString();
    this.socket = new SocketReady<GetJob[]>(socket, "updateBaanJob");
  }
  public listen(set: React.Dispatch<GetJob[]>) {
    this.socket.listen(this.room, set);
  }
  public disconect() {
    this.socket.disconect();
  }
}
export class RealTimePartJob {
  private room: string;
  private socket: SocketReady<GetJob[]>;
  constructor(roomId: Id, socket: Socket) {
    this.room = roomId.toString();
    this.socket = new SocketReady<GetJob[]>(socket, "updatePartJob");
  }
  public listen(set: React.Dispatch<GetJob[]>) {
    this.socket.listen(this.room, set);
  }
  public disconect() {
    this.socket.disconect();
  }
}
