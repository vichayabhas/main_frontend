import { Socket } from "socket.io-client";
import { InterSong } from "../../../interface";
import { SocketReady } from "../utility/setup";

export function triggerNewSong(song: InterSong, socket: Socket) {
  const newSongSocket = new SocketReady<InterSong>(socket, "newSong");
  newSongSocket.trigger(song, "");
}
export class RealTimeNewSong {
  private socket: SocketReady<InterSong>;
  constructor(socket: Socket) {
    this.socket = new SocketReady<InterSong>(socket, "newSong");
  }
  public listen(event: (newSong: InterSong) => void) {
    this.socket.listen("", event);
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
