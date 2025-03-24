import { Socket } from "socket.io-client";
import { Id } from "../../../../interface";
import { SocketReady } from "@/components/utility/setup";

export function triggerBaanSong(baanId: Id, songIds: Id[], socket: Socket) {
  const updateBaanSongSocket = new SocketReady<Id[]>(socket, "updateBaanSong");
  updateBaanSongSocket.trigger(songIds, baanId.toString());
}
export class RealTimeBaanSong {
  private room: string;
  private socket: SocketReady<Id[]>;
  constructor(baanId: Id, socket: Socket) {
    this.room = baanId.toString();
    this.socket = new SocketReady<Id[]>(socket, "updateBaanSong");
  }
  public listen(setSongIds: (set: Id[]) => void) {
    this.socket.listen(this.room, setSongIds);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerCampSong(campId: Id, songIds: Id[], socket: Socket) {
  const updateCampSongSocket = new SocketReady<Id[]>(socket, "updateCampSong");
  updateCampSongSocket.trigger(songIds, campId.toString());
}
export class RealTimeCampSong {
  private room: string;
  private socket: SocketReady<Id[]>;
  constructor(campId: Id, socket: Socket) {
    this.room = campId.toString();
    this.socket = new SocketReady<Id[]>(socket, "updateCampSong");
  }
  public listen(setSongIds: (set: Id[]) => void) {
    this.socket.listen(this.room, setSongIds);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
