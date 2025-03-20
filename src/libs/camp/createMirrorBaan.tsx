import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  CreateMirror,
  GetMirrorBaan,
  TriggerMirrorBaan,
} from "../../../interface";

export default async function createMirrorBaan(
  input: CreateMirror,
  token: string,
  senderSocket: SocketReady<GetMirrorBaan[]>,
  reciverSocket: SocketReady<GetMirrorBaan[]>
) {
  const response = await fetch(`${getBackendUrl()}/camp/createMirrorBaan/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerMirrorBaan = await response.json();
  senderSocket.trigger(data.senders, data.senderId.toString());
  reciverSocket.trigger(data.recivers, data.reciverId.toString());
  return data;
}
