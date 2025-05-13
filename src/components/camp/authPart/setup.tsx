import { Socket } from "socket.io-client";
import { Id } from "../../../../interface";
import { SocketReady } from "@/components/utility/setup";

export function triggerBaanSong(baanId: Id, songIds: Id[], socket: Socket) {
  const updateBaanSongSocket = new SocketReady<Id[]>(socket, "updateBaanSong",baanId);
  updateBaanSongSocket.trigger(songIds);
}
export class RealTimeBaanSong {
  private socket: SocketReady<Id[]>;
  constructor(baanId: Id, socket: Socket) {
    this.socket = new SocketReady<Id[]>(socket, "updateBaanSong",baanId);
  }
  public listen(setSongIds: (set: Id[]) => void) {
    this.socket.listen( setSongIds);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export function triggerCampSong(campId: Id, songIds: Id[], socket: Socket) {
  const updateCampSongSocket = new SocketReady<Id[]>(socket, "updateCampSong",campId);
  updateCampSongSocket.trigger(songIds);
}
export class RealTimeCampSong {
  private socket: SocketReady<Id[]>;
  constructor(campId: Id, socket: Socket) {
    this.socket = new SocketReady<Id[]>(socket, "updateCampSong",campId);
  }
  public listen(setSongIds: (set: Id[]) => void) {
    this.socket.listen( setSongIds);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
