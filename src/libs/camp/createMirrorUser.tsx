import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  CreateMirror,
  GetMirrorUser,
  TriggerMirrorUser,
} from "../../../interface";

export default async function createMirrorUser(
  input: CreateMirror,
  token: string,
  senderSocket: SocketReady<GetMirrorUser[]>,
  reciverSocket: SocketReady<GetMirrorUser[]>
) {
  const response = await fetch(`${getBackendUrl()}/camp/createMirrorUser/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerMirrorUser = await response.json();
  if (!response.ok) {
    return data;
  }
  senderSocket.trigger(data.senders, data.senderId.toString());
  reciverSocket.trigger(data.recivers, data.reciverId.toString());
  return data;
}
