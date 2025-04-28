import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  GetMirrorUser,
  TriggerMirrorUser,
  UpdateMirror,
} from "../../../interface";

export default async function updateMirrorUser(
  input: UpdateMirror,
  token: string,
  senderSocket: SocketReady<GetMirrorUser[]>,
  receiverSocket: SocketReady<GetMirrorUser[]>
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateMirrorUser/`, {
    method: "PUT",
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
  receiverSocket.trigger(data.receivers, data.receiverId.toString());
  return data;
}
