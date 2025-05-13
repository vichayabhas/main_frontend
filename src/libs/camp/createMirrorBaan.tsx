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
  receiverSocket: SocketReady<GetMirrorBaan[]>
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
  if (!response.ok) {
    return data;
  }
  senderSocket.triggerToOther(data.senders, data.senderId.toString());
  receiverSocket.triggerToOther(data.receivers, data.receiverId.toString());
  return data;
}
